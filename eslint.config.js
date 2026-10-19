import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist/', '.astro/', 'node_modules/', 'playwright-report/', 'test-results/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  // Static a11y linting for .astro templates (alt text, valid ARIA, anchor content, etc.).
  astro.configs['jsx-a11y-strict'],
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
);
