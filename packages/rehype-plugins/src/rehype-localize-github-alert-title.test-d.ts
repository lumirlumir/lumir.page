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
  note: '참고',
  tip: '팁',
  important: '중요',
  warning: '경고',
  caution: '주의',
};

// @ts-expect-error - `warning` is required.
rehypeLocalizeGitHubAlertTitle({
  note: '참고',
  tip: '팁',
  important: '중요',
  caution: '주의',
});
// @ts-expect-error - `warning` should be a string.
rehypeLocalizeGitHubAlertTitle({ ...options, warning: 1 });

// #endregion RehypeLocalizeGitHubAlertTitleOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeLocalizeGitHubAlertTitle

rehypeLocalizeGitHubAlertTitle(options) satisfies Function;

// @ts-expect-error - `rehypeLocalizeGitHubAlertTitle` requires options.
rehypeLocalizeGitHubAlertTitle();

// #endregion rehypeLocalizeGitHubAlertTitle
// --------------------------------------------------------------------------------
