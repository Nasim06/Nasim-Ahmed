import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function getRoutes(page: Page): Promise<string[]> {
  await page.goto('/');
  const caseStudies = await page
    .locator('section[aria-labelledby="work"] a[href^="/work/"]')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href') as string));
  return ['/', ...new Set(caseStudies), '/404'];
}

test.describe('accessibility (axe, WCAG 2.2 AA)', () => {
  for (const theme of ['paper', 'clean'] as const) {
    test(`every page has no detectable violations (${theme} theme)`, async ({ page }) => {
      const routes = await getRoutes(page);
      expect(routes.length).toBeGreaterThan(2);

      for (const route of routes) {
        await page.goto(`${route}?theme=${theme}`);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        expect(results.violations, `axe violations on ${route} (${theme})`).toEqual([]);
      }
    });
  }
});

test.describe('keyboard navigation', () => {
  test('skip link is the first tab stop and moves focus to main', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Safari only tabs to links with a system setting enabled.');
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();

    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('every focusable element on the homepage shows a visible focus indicator', async ({
    page,
  }) => {
    await page.goto('/');
    const total = await page.locator('a[href], button, input, [tabindex="0"]').count();
    const seen = new Set<string>();

    for (let i = 0; i < total + 1; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        // Cards draw the ring on the wrapping <article> instead of the link itself.
        const target = el.closest('article') ?? el;
        const style = getComputedStyle(target);
        return {
          key: `${el.tagName}:${el.getAttribute('href')}:${el.textContent?.trim().slice(0, 40)}`,
          hasRing: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
        };
      });
      if (!info) break;
      expect(info.hasRing, `no visible focus ring on ${info.key}`).toBe(true);
      seen.add(info.key);
    }

    // Header nav + hero buttons + 3 project cards at minimum.
    expect(seen.size).toBeGreaterThanOrEqual(10);
  });

  test('project cards open their case study with Enter', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('section[aria-labelledby="work"] a[href^="/work/"]').first();
    const href = await firstCard.getAttribute('href');
    await firstCard.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('case study structure', () => {
  test('follows problem → approach → trade-offs → result', async ({ page }) => {
    const [, firstCaseStudy] = await getRoutes(page);
    await page.goto(firstCaseStudy);
    const sections = await page.locator('.case-study h2').allTextContents();
    expect(sections.map((s) => s.trim())).toEqual(['Problem', 'Approach', 'Trade-offs', 'Result']);
  });
});

test.describe('responsive & motion', () => {
  test('no horizontal scrolling on any page', async ({ page }) => {
    for (const route of await getRoutes(page)) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(0);
    }
  });

  test('animations are disabled with prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const animated = await page.evaluate(
      () =>
        [...document.querySelectorAll('*')].filter((el) => {
          const s = getComputedStyle(el);
          return s.animationName !== 'none' && parseFloat(s.animationDuration) > 0.01;
        }).length,
    );
    expect(animated).toBe(0);
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto');
  });
});
