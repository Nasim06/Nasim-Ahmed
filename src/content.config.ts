import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content lives here (not in page files) so any homepage — the editorial one today,
 * the "Nasim OS '99" retro desktop later — can render the same entries.
 */

/** "YYYY" or "YYYY-MM". Year-only is allowed where the exact month isn't confirmed yet. */
const partialDate = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use "YYYY" or "YYYY-MM"');

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** One sentence for cards, meta descriptions and desktop "file info" panels. */
    summary: z.string().max(200),
    /** Where the work happened, e.g. an employer, "Personal", "University". */
    context: z.string(),
    role: z.string(),
    year: partialDate,
    stack: z.array(z.string()).min(1),
    /** Headline numbers shown in the case-study "Result" sidebar and on cards. */
    outcomes: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .max(3)
      .default([]),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
      })
      .default({}),
    /** Lower comes first on the homepage. */
    order: z.number().int(),
    featured: z.boolean().default(true),
    /** Drafts are excluded from production builds but still visible in `astro dev`. */
    draft: z.boolean().default(false),
    /** Reserved for the retro desktop (icon name / window size). Ignored by the editorial site. */
    desktop: z
      .object({
        icon: z.string().optional(),
      })
      .optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    kind: z.enum(['work', 'education']).default('work'),
    organisation: z.string(),
    role: z.string(),
    location: z.string().optional(),
    start: partialDate,
    /** Omit for a current role. */
    end: partialDate.optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    url: z.url().optional(),
  }),
});

const certifications = defineCollection({
  loader: file('./src/content/certifications.json'),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    url: z.url().optional(),
    year: partialDate.optional(),
  }),
});

export const collections = { projects, experience, certifications };
