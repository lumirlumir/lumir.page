/**
 * @fileoverview Defines shared constants for the app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type LangRecord } from '@/data/lang';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

// Name
export const AUTHOR = {
  ko: '김용현 (lumir)',
  en: 'Yong Hyeon Kim (lumir)',
} as const satisfies LangRecord<string>;

// Website
export const WEBSITE_NAME = 'lumir.page';
export const WEBSITE_URL = `https://${WEBSITE_NAME}`;

// GitHub Repository, Ref: https://docs.github.com/en/rest/repos/repos
export const GITHUB_REPO_OWNER = 'lumirlumir';
export const GITHUB_REPO_NAME = WEBSITE_NAME;
export const GITHUB_REPO_FULL_NAME = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
export const GITHUB_AUTHOR_URL = `https://github.com/${GITHUB_REPO_OWNER}`;

// Google
export const GOOGLE_GA_ID = 'G-2G4YHTE048';
