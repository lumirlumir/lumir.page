/**
 * @fileoverview Defines the author information for the blog.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the blog author's public profile information.
 */
export interface Author {
  /**
   * The URL of the author's avatar image.
   */
  readonly avatarUrl: string;

  /**
   * The author's public profile bio.
   */
  readonly bio: string;

  /**
   * The URL of the author's GitHub profile.
   */
  readonly htmlUrl: string;

  /**
   * The author's public profile name.
   */
  readonly name: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * The blog author's public profile information.
 */
export const author = {
  lumirlumir: {
    avatarUrl: 'https://avatars.githubusercontent.com/u/119669540',
    bio: 'PLAY KEYBOARD, STRIKE A CODE',
    htmlUrl: 'https://github.com/lumirlumir',
    name: 'lumir',
  },
} as const satisfies Record<string, Author>;
