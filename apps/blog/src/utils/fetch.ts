/**
 * @fileoverview Defines fetch helpers.
 * @see https://docs.github.com/en/rest/users/users
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { GITHUB_REPO_OWNER } from '@/constants';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Fetches GitHub user data.
 * @returns A promise that resolves to a GitHub user data object.
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO
export async function getGithubUsers(): Promise<any> {
  const response = await fetch(`https://api.github.com/users/${GITHUB_REPO_OWNER}`, {
    headers: {
      Authorization: `Bearer ${process.env.GH_PAT}`,
    },
    cache: 'force-cache', // https://nextjs.org/docs/app/guides/upgrading/version-15#fetch-requests
  });

  return response.json();
}
