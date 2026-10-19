---
title: A dependable data layer for a new case-management platform
summary: Building the TypeScript and PostgreSQL foundations of Goss Interactive's new case-management product for UK public-sector organisations.
context: Goss Interactive
role: Software Engineer
year: '2025'
stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Vitest']
outcomes:
  - value: '80%+'
    label: 'faster test runs (Jest to Vitest)'
  # [PLACEHOLDER] Up to two more headline numbers.
order: 1
desktop:
  icon: folder-gov
---

## Problem

Goss Interactive was building a new case-management product: software that public-sector teams use
to track a case, such as a resident's request or an application, from first contact to resolution.
Everything in the product depends on reading and writing that case data correctly.

[PLACEHOLDER] What made this hard? For example: complex relationships between cases, people and
documents; audit and data-retention requirements; several services sharing the same data; or a tight
launch date. Give one concrete detail that shows the stakes.

## Approach

I worked on the data layer in TypeScript on Node.js, backed by PostgreSQL.

- [PLACEHOLDER] How you structured it (e.g. repositories, a query builder or ORM, migrations,
  validation at the boundary) and why.
- [PLACEHOLDER] How you made it trustworthy: transactions, constraints in the database, typed
  results, test fixtures against a real Postgres instance.
- Moved the test suite from Jest to Vitest, which cut test run time by over 80%.
  [PLACEHOLDER] What prompted it, what the migration involved, and what faster feedback changed
  for the team.
- [PLACEHOLDER] How other developers use it, and what you did to make that easy.

## Trade-offs

[PLACEHOLDER] What you chose not to do and why. For example: raw SQL versus an ORM, strictness
versus speed of delivery, or normalising the schema versus keeping queries simple. Say whether you'd
make the same call again.

## Result

[PLACEHOLDER] Where the product stands now, what the data layer made possible for the rest of the
team, and any numbers you can share (test coverage, query performance, bugs caught before release).
End with one thing you learned.
