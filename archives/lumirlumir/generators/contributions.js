/**
 * @fileoverview Generate `contributions.md`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { GitHubRepoStars } from '../components/index.js';
import {
  ContributionsHandler,
  sortContributions,
  typeToTitle,
} from '../core/helpers/index.js';
import {
  URL_GITHUB_LUMIR,
  URL_GITHUB_ORGANIZATION,
  URL_GITHUB_REPOSITORY,
  URL_GITHUB_PULL_REQUEST,
  URL_GITHUB_PULL_REQUEST_COMMENT,
  URL_GITHUB_ISSUE,
  URL_GITHUB_ISSUE_COMMENT,
  URL_GITHUB_DISCUSSION_COMMENT,
  COMMENT_DO_NOT_EDIT,
} from '../core/constants.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../types/index.d.ts').Organization} Organization
 * @typedef {import('../types/index.d.ts').PullRequest} PullRequest
 * @typedef {import('../types/index.d.ts').Issue} Issue
 * @typedef {import('../types/index.d.ts').PullRequestComment} PullRequestComment
 * @typedef {import('../types/index.d.ts').IssueComment} IssueComment
 * @typedef {import('../types/index.d.ts').DiscussionComment} DiscussionComment
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Generate `contributions.md`.
 * @param {readonly Organization[]} contributions
 * @returns {string}
 */
export default function generateContributions(contributions) {
  const ch = new ContributionsHandler(contributions);

  let markdown = `${COMMENT_DO_NOT_EDIT}

# Open Source Contribution Journey

Every contribution I have made to open source projects is listed here.

Copyright © 2024-${new Date().getFullYear()} [루밀LuMir(lumirlumir)](${URL_GITHUB_LUMIR}). All rights reserved.

## Overview

### Pull Requests

| Contributed Organizations                | Contributed Repositories                | Merged Pull Requests                         |
| :--------------------------------------: | :-------------------------------------: | :------------------------------------------: |
| ${ch.countAllContributedOrganizations()} | ${ch.countAllContributedRepositories()} | More than ${ch.countAllMergedPullRequests()} |

| ${typeToTitle('feat', { title: false })} feat | ${typeToTitle('fix', { title: false })} fix | ${typeToTitle('build', { title: false })} build | ${typeToTitle('chore', { title: false })} chore | ${typeToTitle('ci', { title: false })} ci | ${typeToTitle('docs', { title: false })} docs | ${typeToTitle('perf', { title: false })} perf | ${typeToTitle('refactor', { title: false })} refactor | ${typeToTitle('style', { title: false })} style | ${typeToTitle('test', { title: false })} test |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| ${ch.countAllMergedPullRequestsByType('feat')} | ${ch.countAllMergedPullRequestsByType('fix')} | ${ch.countAllMergedPullRequestsByType('build')} | ${ch.countAllMergedPullRequestsByType('chore')} | ${ch.countAllMergedPullRequestsByType('ci')} | ${ch.countAllMergedPullRequestsByType('docs')} | ${ch.countAllMergedPullRequestsByType('perf')} | ${ch.countAllMergedPullRequestsByType('refactor')} | ${ch.countAllMergedPullRequestsByType('style')} | ${ch.countAllMergedPullRequestsByType('test')} |

### Others

| Issues Created                   | Comments Created                                                                                             |
| :------------------------------: | :----------------------------------------------------------------------------------------------------------: |
| More than ${ch.countAllIssues()} | More than ${ch.countAllPullRequestComments() + ch.countAllIssueComments() + ch.countAllDiscussionComments()} |

## Highlights

# Pull Requests

| Emoji          | Description                |
| -------------- | -------------------------- |
| :purple_heart: | Successfully merged        |
| :green_heart:  | Still open but meaningful  |
`;

  contributions.forEach(organization => {
    markdown += `\n## [\`${organization.name}\`](${URL_GITHUB_ORGANIZATION(organization.name)})\n`;

    organization.repositories.forEach(repository => {
      markdown += `\n### [\`${repository.name}\`](${URL_GITHUB_REPOSITORY(organization.name, repository.name)}) ${GitHubRepoStars(organization.name, repository.name)}\n`;

      if (repository.pullRequests !== undefined) {
        sortContributions(repository.pullRequests).forEach(
          ({ number, type, title, merged }, idx, pullRequests) => {
            if (idx === 0 || pullRequests[idx - 1].type !== type) {
              markdown += `\n#### ${typeToTitle(type)}\n\n`;
            }

            markdown += `1. ${title} [#${number}](${URL_GITHUB_PULL_REQUEST(organization.name, repository.name, number)}) ${merged ? ':purple_heart:' : ':green_heart:'}\n`;
          },
        );
      }

      repository?.issues?.forEach((/** @type {Issue} */ { number, title }, idx) => {
        if (idx === 0) markdown += `\n#### :speech_balloon: Issues\n\n`;

        markdown += `1. ${title} [#${number}](${URL_GITHUB_ISSUE(organization.name, repository.name, number)})\n`;
      });

      repository?.pullRequestComments?.forEach(
        (/** @type {PullRequestComment} */ { number, title, fragment }, idx) => {
          if (idx === 0) markdown += `\n#### :newspaper: Pull Request Comments\n\n`;

          markdown += `1. ${title} [#${number}](${URL_GITHUB_PULL_REQUEST_COMMENT(organization.name, repository.name, number, fragment)})\n`;
        },
      );

      repository?.issueComments?.forEach(
        (/** @type {IssueComment} */ { number, title, fragment }, idx) => {
          if (idx === 0) markdown += `\n#### :newspaper: Issue Comments\n\n`;

          markdown += `1. ${title} [#${number}](${URL_GITHUB_ISSUE_COMMENT(organization.name, repository.name, number, fragment)})\n`;
        },
      );

      repository?.discussionComments?.forEach(
        (/** @type {DiscussionComment} */ { number, title, fragment }, idx) => {
          if (idx === 0) markdown += `\n#### :newspaper: Discussion Comments\n\n`;

          markdown += `1. ${title} [#${number}](${URL_GITHUB_DISCUSSION_COMMENT(organization.name, repository.name, number, fragment)})\n`;
        },
      );
    });
  });

  return markdown;
}
