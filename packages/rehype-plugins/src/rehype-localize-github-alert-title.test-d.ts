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

let options: RehypeLocalizeGitHubAlertTitleOptions;

options = {};
options = { warning: '경고' };
options = { warning: '' };
options = {
  note: '참고',
  tip: '팁',
  important: '중요',
  warning: '경고',
  caution: '주의',
};

// @ts-expect-error - `note` should be a string.
options = { note: 123 };
// @ts-expect-error - `tip` should be a string.
options = { tip: 123 };
// @ts-expect-error - `important` should be a string.
options = { important: 123 };
// @ts-expect-error - `warning` should be a string.
options = { warning: 123 };
// @ts-expect-error - `warning` should be a string.
options = { warning: undefined };
// @ts-expect-error - `caution` should be a string.
options = { caution: 123 };
// @ts-expect-error - `unknown` is not a valid property of `RehypeLocalizeGitHubAlertTitleOptions`.
options = { unknown: 'unknown' };

// #endregion RehypeLocalizeGitHubAlertTitleOptions
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region rehypeLocalizeGitHubAlertTitle

({}) as typeof rehypeLocalizeGitHubAlertTitle satisfies Function;
({}) as Parameters<typeof rehypeLocalizeGitHubAlertTitle>[0] satisfies
  RehypeLocalizeGitHubAlertTitleOptions | undefined;
({}) as ReturnType<typeof rehypeLocalizeGitHubAlertTitle> satisfies Function;

rehypeLocalizeGitHubAlertTitle();

// @ts-expect-error - `rehypeLocalizeGitHubAlertTitle` should be a function.
({}) as typeof rehypeLocalizeGitHubAlertTitle satisfies boolean;
// @ts-expect-error - `rehypeLocalizeGitHubAlertTitle` should be a function.
({}) as typeof rehypeLocalizeGitHubAlertTitle satisfies string;

// #endregion rehypeLocalizeGitHubAlertTitle
// --------------------------------------------------------------------------------
