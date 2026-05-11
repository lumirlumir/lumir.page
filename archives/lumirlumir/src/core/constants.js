/**
 * @fileoverview Constants.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {string} */
export const URL_GITHUB = 'https://github.com';
/** @type {string} */
export const URL_GITHUB_LUMIR = `${URL_GITHUB}/lumir`;
/** @param {string} organization */
export const URL_GITHUB_ORGANIZATION = organization => `${URL_GITHUB}/${organization}`;
/** @param {string} organization @param {string} repository */
export const URL_GITHUB_REPOSITORY = (organization, repository) =>
  `${URL_GITHUB_ORGANIZATION(organization)}/${repository}`;
/** @param {string} organization @param {string} repository @param {number} number */
export const URL_GITHUB_PULL_REQUEST = (organization, repository, number) =>
  `${URL_GITHUB_REPOSITORY(organization, repository)}/pull/${number}`;
/** @param {string} organization @param {string} repository @param {number} number @param {string} fragment */
export const URL_GITHUB_PULL_REQUEST_COMMENT = (
  organization,
  repository,
  number,
  fragment,
) => `${URL_GITHUB_PULL_REQUEST(organization, repository, number)}#${fragment}`;
/** @param {string} organization @param {string} repository @param {number} number */
export const URL_GITHUB_ISSUE = (organization, repository, number) =>
  `${URL_GITHUB_REPOSITORY(organization, repository)}/issues/${number}`;
/** @param {string} organization @param {string} repository @param {number} number @param {string} fragment */
export const URL_GITHUB_ISSUE_COMMENT = (organization, repository, number, fragment) =>
  `${URL_GITHUB_ISSUE(organization, repository, number)}#${fragment}`;
/** @param {string} organization @param {string} repository @param {number} number */
export const URL_GITHUB_DISCUSSION = (organization, repository, number) =>
  `${URL_GITHUB_REPOSITORY(organization, repository)}/discussions/${number}`;
/** @param {string} organization @param {string} repository @param {number} number @param {string} fragment */
export const URL_GITHUB_DISCUSSION_COMMENT = (
  organization,
  repository,
  number,
  fragment,
) => `${URL_GITHUB_DISCUSSION(organization, repository, number)}#${fragment}`;

/** @type {string} */
export const COMMENT_DO_NOT_EDIT =
  '<!-- This file is auto-generated. Please do not edit it directly. -->\n\n<!-- eslint-disable -->\n<!-- markdownlint-disable -->';

/** @type {string} */
export const COLOR_FG = '#D6BBF2';
/** @type {string} */
export const COLOR_BG = '#151b23';
