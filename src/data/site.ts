/**
 * Site-wide identity and links. Edit here; every page and future homepage reads from this.
 */
export const site = {
  name: 'Nasim Ahmed',
  role: 'Full-stack Software Engineer',
  pitch:
    'Full-stack engineer with four years building SaaS — currently case management for the UK public sector.',
  description:
    'Nasim Ahmed — full-stack software engineer (TypeScript, Node.js, Java, PostgreSQL). Selected work, case studies and experience.',
  location: '[PLACEHOLDER] City, UK',
  openToWork: true,
  availability: 'Open to new roles',
  // [PLACEHOLDER] Add location / remote preference, e.g. "· London or remote".
  availabilityDetail: 'Looking for a full-stack or back-end role with more ownership.',
  /** Short "what I'm doing now" line. */
  now: 'Studying for AWS Solutions Architect – Associate',
  links: {
    // [PLACEHOLDER] Add your CV as public/cv.pdf
    cv: '/cv.pdf',
    github: 'https://github.com/Nasim06',
    linkedin: 'https://www.linkedin.com/in/PLACEHOLDER',
    email: 'PLACEHOLDER@example.com',
  },
  about: [
    "I'm a full-stack software engineer with four years' experience building SaaS products. At Goss Interactive I'm building the data layer for a new case-management platform used by UK public-sector organisations. Before that, I spent two years at Engage Hub working on customer-journey automation in Java and leading a move from jQuery to React.",
    "I like understanding my tools from the ground up — it's why I learnt C, and why I'm studying for the AWS Solutions Architect certification. I'm looking for a role with more ownership, where I can take work from design through to production.",
    "Away from the keyboard I do martial arts and run, and I love learning languages: I speak English and Bengali, get by in Spanish, and I'm learning Japanese.",
  ],
  skills: [
    {
      group: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'Bash', 'HTML/CSS'],
    },
    { group: 'Frameworks & testing', items: ['Node.js', 'React', 'Django', 'JSP', 'Jest', 'Vite'] },
    { group: 'Data & tooling', items: ['PostgreSQL', 'MySQL', 'Linux', 'Jenkins', 'Git', 'SVN'] },
  ],
} as const;
