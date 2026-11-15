/**
 * @fileoverview GitHub Repository Stars Badge.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * GitHub Repository Stars Badge.
 * @param {string} organizationName
 * @param {string} repositoryName
 * @returns
 */
export default function GitHubRepoStars(organizationName, repositoryName) {
  return `![GitHub Repo Stars](https://img.shields.io/github/stars/${organizationName}/${repositoryName})`;
}
