/**
 * @fileoverview Define common types.
 */

/* eslint-disable typescript/no-empty-object-type -- Required for type definitions. */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * Type of the Pull Request, Issue, etc.
 */
export type Type =
  | 'feat'
  | 'fix'
  | 'build'
  | 'chore'
  | 'ci'
  | 'docs'
  | 'perf'
  | 'refactor'
  | 'style'
  | 'test';

/**
 * Represents a GitHub organization.
 */
export interface Organization {
  /**
   * Name of the organization.
   */
  readonly name: string;

  /**
   * Description for the organization.
   */
  readonly description?: string;

  /**
   * Represents GitHub repositories.
   */
  readonly repositories: readonly Repository[];
}

/**
 * Represents a GitHub repository.
 */
export interface Repository {
  /**
   * Name of the repository.
   */
  readonly name: string;

  /**
   * Description for the repository.
   */
  readonly description?: string;

  /**
   * Role of the user in the repository.
   */
  readonly role?: 'contributor' | 'maintainer';

  /**
   * Represents GitHub Pull Requests.
   */
  readonly pullRequests?: readonly PullRequest[];

  /**
   * Represents GitHub Issues.
   */
  readonly issues?: readonly Issue[];

  /**
   * Represents GitHub Discussions.
   */
  readonly discussions?: readonly Discussion[];

  /**
   * Represents GitHub Pull Request comments.
   */
  readonly pullRequestComments?: readonly PullRequestComment[];

  /**
   * Represents GitHub Issue comments.
   */
  readonly issueComments?: readonly IssueComment[];

  /**
   * Represents GitHub Discussion comments.
   */
  readonly discussionComments?: readonly DiscussionComment[];
}

/**
 * Common interface for Pull Request, Issue, etc.
 */
export interface Contribution {
  /**
   * Number of the Pull Request, Issue, etc.
   */
  readonly number: number;

  /**
   * Type of the Pull Request, Issue, etc.
   */
  readonly type?: Type;

  /**
   * Title of the Pull Request, Issue, etc.
   */
  readonly title: string;

  /**
   * Additional description about the Pull Request, Issue, etc.
   */
  readonly description?: string;

  /**
   * Highlight the contribution.
   */
  readonly highlight?: boolean;
}

/**
 * Common interface for comment.
 */
export interface Comment {
  /**
   * Hash fragment of the comment without the leading `#`.
   * For example, `issuecomment-123456789` for issue comments.
   */
  readonly fragment: string;
}

/**
 * Represents a GitHub Pull Request.
 */
export interface PullRequest extends Contribution {
  /**
   * Type of the Pull Request. This field is required for Pull Requests.
   */
  readonly type: Type;

  /**
   * Indicates whether the PR has been merged.
   */
  readonly merged: boolean;

  /**
   * Commit SHA associated with the PR.
   */
  readonly sha?: string;

  /**
   * Release tag version associated with the PR.
   * Often starts with `v` and is followed by a version number.
   */
  readonly releases?: readonly string[];
}

/**
 * Represents a GitHub Issue.
 */
export interface Issue extends Contribution {}

/**
 * Represents a GitHub Discussion.
 */
export interface Discussion extends Contribution {}

/**
 * Represents a GitHub Pull Request comment.
 */
export interface PullRequestComment extends Contribution, Comment {}

/**
 * Represents a GitHub Issue comment.
 */
export interface IssueComment extends Contribution, Comment {}

/**
 * Represents a GitHub Discussion comment.
 */
export interface DiscussionComment extends Contribution, Comment {}
