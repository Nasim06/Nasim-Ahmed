import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Experience = CollectionEntry<'experience'>;

/** Published projects, ordered for display. Drafts are shown in dev only. */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured).slice(0, limit);
}

/** Most recent first; current roles (no end date) lead. */
export async function getExperience(kind?: Experience['data']['kind']): Promise<Experience[]> {
  const entries = await getCollection('experience', ({ data }) => !kind || data.kind === kind);
  return entries.sort((a, b) => {
    const endA = a.data.end ?? '9999';
    const endB = b.data.end ?? '9999';
    return endB.localeCompare(endA) || b.data.start.localeCompare(a.data.start);
  });
}

const monthFmt = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2024-08" → "Aug 2024", "2022" → "2022". */
export function formatPartialDate(value: string): string {
  const [year, month] = value.split('-').map(Number);
  if (!month) return String(year);
  return monthFmt.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatRange(start: string, end?: string): string {
  return `${formatPartialDate(start)} – ${end ? formatPartialDate(end) : 'Present'}`;
}

/** The four sections every case study must have, in order. */
export const CASE_STUDY_SECTIONS = ['Problem', 'Approach', 'Trade-offs', 'Result'] as const;
