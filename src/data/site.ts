/**
 * Site-wide identity and links. Edit here; every page and future homepage reads from this.
 */
export const site = {
  name: 'Nasim Ahmed',
  role: 'Software Engineer',
  // [PLACEHOLDER] Draft pitch — rewrite in your own words (keep it to one line).
  pitch: 'Software engineer building accessible, dependable web products for the public sector.',
  description: 'Nasim Ahmed — software engineer. Selected work, case studies and experience.',
  location: '[PLACEHOLDER] City, UK',
  openToWork: true,
  // [PLACEHOLDER] What kind of role you want, shown next to the availability badge.
  availability: 'Open to new roles',
  availabilityDetail: '[PLACEHOLDER] e.g. full-stack / front-end · UK remote or hybrid',
  links: {
    // [PLACEHOLDER] Add your CV as public/cv.pdf
    cv: '/cv.pdf',
    github: 'https://github.com/PLACEHOLDER',
    linkedin: 'https://www.linkedin.com/in/PLACEHOLDER',
    email: 'PLACEHOLDER@example.com',
  },
} as const;
