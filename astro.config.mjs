// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const fontFile = (/** @type {string} */ pkg, /** @type {string} */ file) =>
  `./node_modules/${pkg}/files/${file}.woff2`;

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real domain once it's live on Vercel.
  site: 'https://nasim-ahmed.vercel.app',
  trailingSlash: 'never',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [sitemap()],
  markdown: {
    // Default github-dark fails WCAG AA for comments; the high-contrast variant passes.
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  // Self-hosted, latin-only fonts. Astro generates metric-matched fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            weight: '200 800',
            style: 'normal',
            src: [
              fontFile(
                '@fontsource-variable/bricolage-grotesque',
                'bricolage-grotesque-latin-wght-normal',
              ),
            ],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: [fontFile('@fontsource/ibm-plex-sans', 'ibm-plex-sans-latin-400-normal')],
          },
          {
            weight: 400,
            style: 'italic',
            src: [fontFile('@fontsource/ibm-plex-sans', 'ibm-plex-sans-latin-400-italic')],
          },
          {
            weight: 500,
            style: 'normal',
            src: [fontFile('@fontsource/ibm-plex-sans', 'ibm-plex-sans-latin-500-normal')],
          },
          {
            weight: 600,
            style: 'normal',
            src: [fontFile('@fontsource/ibm-plex-sans', 'ibm-plex-sans-latin-600-normal')],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: [fontFile('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal')],
          },
          {
            weight: 500,
            style: 'normal',
            src: [fontFile('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal')],
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
