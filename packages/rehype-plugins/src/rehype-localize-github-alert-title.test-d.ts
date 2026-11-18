/**
 * @fileoverview Type test for `rehype-localize-github-alert-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  rehypeLocalizeGitHubAlertTitle,
  type RehypeLocalizeGitHubAlertTitleOptions,
} from './rehype-localize-github-alert-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region RehypeLocalizeGitHubAlertTitleOptions

const options: RehypeLocalizeGitHubAlertTitleOptions = {
  Note: '참고',
  Tip: '팁',
  Important: '중요',
  Warning: '경고',
  Caution: '주의',
};

// @ts-expect-error - `Warning` is required.
rehypeLocalizeGitHubAlertTitle({
  Note: '참고',
  Tip: '팁',
  Important: '중요',
  Caution: '주의',
});
// @ts-expect-error - `Warning` should be a string.
rehypeLocalizeGitHubAlertTitle({ ...options, Warning: 1 });

// #endregion RehypeLocalizeGitHubAlertTitleOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeLocalizeGitHubAlertTitle

rehypeLocalizeGitHubAlertTitle(options) satisfies Function;

// @ts-expect-error - `rehypeLocalizeGitHubAlertTitle` requires options.
rehypeLocalizeGitHubAlertTitle();

// #endregion rehypeLocalizeGitHubAlertTitle
// --------------------------------------------------------------------------------
