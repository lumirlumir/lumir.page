/**
 * @fileoverview Contributions data handler.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../../types/index.d.ts').Organization} Organization
 * @typedef {import('../../types/index.d.ts').Repository} Repository
 * @typedef {import('../../types/index.d.ts').PullRequest} PullRequest
 * @typedef {import('../../types/index.d.ts').Issue} Issue
 * @typedef {import('../../types/index.d.ts').PullRequestComment} PullRequestComment
 * @typedef {import('../../types/index.d.ts').IssueComment} IssueComment
 * @typedef {import('../../types/index.d.ts').DiscussionComment} DiscussionComment
 * @typedef {import('../../types/index.d.ts').Type} Type
 */

// --------------------------------------------------------------------------------
// Class
// --------------------------------------------------------------------------------

/**
 * Contributions data handler.
 */
export default class ContributionsHandler {
  // ------------------------------------------------------------------------------
  // Private Properties
  // ------------------------------------------------------------------------------

  /** @type {readonly Organization[]} */
  #contributions;

  /** @param {readonly Organization[]} contributions */
  constructor(contributions = []) {
    this.#contributions = contributions;
  }

  // ------------------------------------------------------------------------------
  // Public Methods
  // ------------------------------------------------------------------------------

  /**
   * Get all repositories from all organizations.
   * @returns {Repository[]}
   */
  getAllRepositories() {
    return this.#contributions.flatMap(organization => organization.repositories);
  }

  /**
   * Get all pull requests from all organizations and repositories.
   * @returns {PullRequest[]}
   */
  getAllPullRequests() {
    return this.getAllRepositories().flatMap(
      repository => repository?.pullRequests ?? [],
    );
  }

  /**
   * Get all issues from all organizations and repositories.
   * @returns {Issue[]}
   */
  getAllIssues() {
    return this.getAllRepositories().flatMap(repository => repository?.issues ?? []); // Handle `undefined`.
  }

  /**
   * Get all pull request comments from all organizations and repositories.
   * @returns {PullRequestComment[]}
   */
  getAllPullRequestComments() {
    return this.getAllRepositories().flatMap(
      repository => repository?.pullRequestComments ?? [],
    );
  }

  /**
   * Get all issue comments from all organizations and repositories.
   * @returns {IssueComment[]}
   */
  getAllIssueComments() {
    return this.getAllRepositories().flatMap(
      repository => repository?.issueComments ?? [],
    );
  }

  /**
   * Get all discussion comments from all organizations and repositories.
   * @returns {DiscussionComment[]}
   */
  getAllDiscussionComments() {
    return this.getAllRepositories().flatMap(
      repository => repository?.discussionComments ?? [],
    );
  }

  // ------------------------------------------------------------------------------

  /**
   * Get all pull requests that are merged from all organizations and repositories.
   * @returns {PullRequest[]}
   */
  getAllMergedPullRequests() {
    return this.getAllPullRequests().filter(pullRequest => pullRequest.merged);
  }

  /**
   * Get all pull requests that are merged from all organizations and repositories by type.
   * @param {Type} type
   * @returns {PullRequest[]}
   */
  getAllMergedPullRequestsByType(type) {
    return this.getAllMergedPullRequests().filter(
      pullRequest => pullRequest.type === type,
    );
  }

  /**
   * Get all pull requests that are highlighted from all organizations and repositories.
   * @returns {PullRequest[]}
   */
  getAllHighlightedPullRequests() {
    return this.getAllPullRequests().filter(pullRequest => pullRequest?.highlight);
  }

  // ------------------------------------------------------------------------------

  /**
   * Count all contributed organizations.
   * @returns {number}
   */
  countAllContributedOrganizations() {
    return this.#contributions.filter(organization =>
      organization.repositories.some(repository =>
        repository?.pullRequests?.some(pullRequest => pullRequest.merged),
      ),
    ).length;
  }

  /**
   * Count all contributed repositories from all organizations.
   * @returns {number}
   */
  countAllContributedRepositories() {
    return this.getAllRepositories().filter(repository =>
      repository?.pullRequests?.some(pullRequest => pullRequest.merged),
    ).length;
  }

  /**
   * Count all merged pull requests from all organizations and repositories.
   * @returns {number}
   */
  countAllMergedPullRequests() {
    return this.getAllMergedPullRequests().length;
  }

  /**
   * Count all highlighted pull requests from all organizations and repositories.
   * @returns {number}
   */
  countAllHighlightedPullRequests() {
    return this.getAllHighlightedPullRequests().length;
  }

  /**
   * Count all merged pull requests from all organizations and repositories by type.
   * @param {Type} type
   * @returns {number}
   */
  countAllMergedPullRequestsByType(type) {
    return this.getAllMergedPullRequestsByType(type).length;
  }

  /**
   * Count all issues from all organizations and repositories.
   * @returns {number}
   */
  countAllIssues() {
    return this.getAllIssues().length;
  }

  /**
   * Count all pull request comments from all organizations and repositories.
   * @returns {number}
   */
  countAllPullRequestComments() {
    return this.getAllPullRequestComments().length;
  }

  /**
   * Count all issue comments from all organizations and repositories.
   * @returns {number}
   */
  countAllIssueComments() {
    return this.getAllIssueComments().length;
  }

  /**
   * Count all discussion comments from all organizations and repositories.
   * @returns {number}
   */
  countAllDiscussionComments() {
    return this.getAllDiscussionComments().length;
  }

  // ------------------------------------------------------------------------------
  // Getters and Setters
  // ------------------------------------------------------------------------------

  /** @returns {readonly Organization[]} */
  get contributions() {
    return this.#contributions;
  }
}
