/**
 * @fileoverview LuMir's contributions!
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../types/index.d.ts').Organization} Organization
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {Organization[]} */
export default [
  {
    name: 'reactjs',
    repositories: [
      {
        name: 'ko.react.dev',
        role: 'maintainer',
        pullRequests: [
          {
            number: 975,
            type: 'fix',
            title: 'fix: correct path handling for file name extraction in `rss.js`',
            merged: true,
            highlight: true,
          },
        ],
      },
      {
        name: 'react.dev',
        role: 'contributor',
        pullRequests: [
          {
            number: 7185,
            type: 'feat',
            title: '✨KOREAN(ko.react.dev) Translation Completed',
            highlight: true,
            merged: true,
          },
          {
            number: 7005,
            type: 'fix',
            title: 'fix: correct path handling for file name extraction in `rss.js`',
            description:
              'The changes have not yet been reflected in [reactjs/react.dev](https://github.com/reactjs/react.dev/pull/7005), but they have been properly reflected in [reactjs/ko.react.dev](https://github.com/reactjs/ko.react.dev/pull/975).',
            highlight: true,
            merged: false,
            sha: '607c2c9218f2a7b1cecd6d0836911249e2cad8a1',
          },
        ],
        issues: [
          {
            number: 7399,
            type: 'feat',
            title: '[Suggestion]: Please Support i18n for 18.react.dev',
          },
        ],
      },
    ],
  },

  {
    name: 'vercel',
    repositories: [
      {
        name: 'next.js',
        role: 'contributor',
        pullRequests: [
          {
            number: 69220,
            type: 'fix',
            title:
              'fix: ensure absolute paths are handled correctly with `--file` option in `next lint` command for `lint-staged` compatibility',
            description: 'CORE CHANGES',
            highlight: true,
            merged: true,
            sha: 'afcad43ba81249cc78a22b07e3191f2b63c3f0de',
            releases: ['v15.0.0-canary.141', 'v15.0.0'],
          },
          {
            number: 71033,
            type: 'fix',
            title:
              'fix: `getStaticProps` appears instead of `generateStaticParams` during app router build',
            description: 'CORE CHANGES',
            highlight: true,
            merged: true,
            sha: 'efee005ef410b906575701b14b64331e3a09b005',
            releases: ['v15.0.0-canary.187', 'v15.0.0'],
          },
          {
            number: 71134,
            type: 'fix',
            title:
              'fix: `next info` command does not output the versions of `npm` `yarn` and `pnpm` correctly',
            description: 'CORE CHANGES',
            highlight: true,
            merged: true,
            releases: ['v15.0.3-canary.6'],
          },
          {
            number: 71190,
            type: 'chore',
            title: 'fix: Next.js missed a file when renaming `swrDelta` to `expireTime`',
            highlight: true,
            merged: true,
            releases: ['v15.0.0-canary.187'],
          },
          {
            number: 73165,
            type: 'chore',
            title: 'chore: remove non-existent hash fragments from URLs',
            merged: true,
          },
          {
            number: 71189,
            type: 'chore',
            title: 'chore: delete redundant blank spaces in `packages` directory',
            merged: true,
            sha: '189329f595506fe5508bdc5d4485002276cad82b',
            releases: ['v15.0.0-canary.189', 'v15.0.0'],
          },
          {
            number: 71240,
            type: 'chore',
            title: 'rename: `.md` to `.mdx` in `errors` directory',
            merged: true,
            sha: '0518f69eac9530e3cb740e0d65998207ff7a4889',
            releases: ['v15.0.0-canary.197'],
          },
          {
            number: 71239,
            type: 'chore',
            title: 'chore: delete redundant blank spaces in `examples`',
            merged: true,
            sha: '88238fb5a893b5ce750901518b35d3fcd9308a7b',
            releases: ['v15.0.3-canary.0'],
          },
          {
            number: 72055,
            type: 'chore',
            title: 'test: fix redundant double spaces',
            merged: true,
            releases: ['v15.0.3-canary.2'],
          },
          {
            number: 72058,
            type: 'chore',
            title: 'fix: redundant double space in `middleware-plugin.ts`',
            merged: true,
            releases: ['v15.0.3-canary.2'],
          },
          {
            number: 72059,
            type: 'chore',
            title: 'fix: redundant double space in `http.rs`',
            merged: true,
            releases: ['v15.0.3-canary.2'],
          },
          {
            number: 71074,
            type: 'docs',
            title:
              'docs(javascript): fix wrong javascript code in `11-parallel-routes.mdx`',
            merged: true,
            sha: '5bd42716c69503e7361eba43151e85124a960056',
            releases: ['v15.0.0-canary.183'],
          },
          {
            number: 71143,
            type: 'docs',
            title: 'docs(javascript): fix wrong javascript code and a typo in `link.mdx`',
            merged: true,
            sha: '7852586ee69e400125a68b2009811f3d0c722d21',
            releases: ['v15.0.0-canary.187'],
          },
          {
            number: 71180,
            type: 'docs',
            title:
              'docs(terminal): fix wrong terminal command and add missing hash symbols',
            merged: true,
            sha: 'a89d0662d941da07b2ab038e56c046405eeba1b6',
            releases: ['v15.0.0-canary.187'],
          },
          {
            number: 71238,
            type: 'docs',
            title: 'docs(javascript): add module exports and experimental metadata',
            merged: true,
            sha: 'aa3516885723e83476fef65d32ff5be183825622',
            releases: ['v15.0.3-canary.0'],
          },
          {
            number: 71509,
            type: 'docs',
            title: 'docs(javascript): fix wrong javascript code in `script.mdx`',
            merged: true,
            sha: 'de5237df130ef187c67c71fc6115c0f3fc742a3a',
            releases: ['v15.0.3-canary.0'],
          },
          {
            number: 73163,
            type: 'docs',
            title: 'docs: add missing punctuation in `developing-using-local-app.md`',
            merged: true,
          },
          {
            number: 72061,
            type: 'docs',
            title: 'docs: update `02-jest.mdx`',
            merged: true,
          },
          {
            number: 72182,
            type: 'docs',
            title: 'docs(typo): fix typos in `03-playwright.mdx`',
            merged: true,
          },
          {
            number: 72218,
            type: 'docs',
            title: 'docs(typo): fix typos in `04-cypress.mdx`',
            merged: true,
          },
          {
            number: 71137,
            type: 'docs',
            title: 'docs(typo): fix redundant double spaces',
            merged: true,
            sha: '1235199d284571f36965b221fead8b136f4efa7a',
            releases: ['v15.0.0-canary.185'],
          },
          {
            number: 71152,
            type: 'docs',
            title: 'docs(typo): fix typo github in cli related docs',
            merged: true,
            sha: '8decfbb0f08f1fb95cd6a436194d2c1bb0987ce4',
            releases: ['v15.0.0-canary.185'],
          },
          {
            number: 71175,
            type: 'docs',
            title: 'docs(typo): fix typo javascript',
            merged: true,
            sha: 'a987e2b441dca72c6240b23c71e65004e71b728d',
            releases: ['v15.0.0-canary.187'],
          },
          {
            number: 71188,
            type: 'docs',
            title: 'docs(typo): fix typos in `turbo.mdx`',
            merged: true,
            sha: '07a32bcc60de28e9c7f1653f7d27a34b0d7e4170',
            releases: ['v15.0.0-canary.187'],
          },
          {
            number: 71203,
            type: 'docs',
            title: 'docs(typo): add punctuations and fix cases',
            merged: true,
            sha: '1172b38cf666ebff440252509b1e1eb6785a652f',
            releases: ['v15.0.0-canary.189'],
          },
          {
            number: 71213,
            type: 'docs',
            title: 'docs(typo): remove unnecessary spaces',
            merged: true,
            sha: '9e0f98f22c90798e6513e9d3678e57bdddc2359e',
            releases: ['v15.0.0-canary.189'],
          },
          {
            number: 71214,
            type: 'docs',
            title: 'docs(typo): fix url to URL',
            merged: true,
            sha: 'bc1d5b468ab1a68e5343c3b884c544e936e5cba5',
            releases: ['v15.0.0-canary.189'],
          },
          {
            number: 71510,
            type: 'docs',
            title: 'docs(typo): fix typos in `webpack.mdx`',
            merged: true,
            sha: '575a89f8f8d5a7fc8b86ac9bc3686673fe084a20',
            releases: ['v15.0.3-canary.0'],
          },
          {
            number: 72057,
            type: 'docs',
            title: 'docs(typo): fix typos in `08-testing/index.mdx`',
            merged: true,
          },
        ],
        issueComments: [
          {
            number: 71149,
            type: 'fix',
            title:
              'Build: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got undefined.',
            fragment: 'issuecomment-2413957604',
            highlight: true,
          },
          {
            number: 71085,
            type: 'chore',
            title: 'redux example double `use client`',
            fragment: 'issuecomment-2406732518',
          },
          {
            number: 60532,
            type: 'fix',
            title:
              'App router shows (SSG) prerendered as static HTML (uses getStaticProps)',
            fragment: 'issuecomment-2402760264',
          },
          {
            number: 70960,
            type: 'docs',
            title:
              'Docs: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching ',
            fragment: 'issuecomment-2406740761',
          },
        ],
        discussionComments: [
          {
            number: 71096,
            title:
              'Next.js 14 Server Calling API and Passing Data to Component Interaction issue',
            fragment: 'discussioncomment-10922723',
          },
          {
            number: 71166,
            title:
              'Having a conflict between client-side/server-side components when a state-using context is involved',
            fragment: 'discussioncomment-10922578',
          },
          {
            number: 71032,
            title: 'Is it possible to render plain html content in head?',
            fragment: 'discussioncomment-10922782',
          },
          {
            number: 70973,
            title: 'How to call a function without making it client side?',
            fragment: 'discussioncomment-10922834',
          },
        ],
      },
    ],
  },

  {
    name: 'lerna',
    repositories: [
      {
        name: 'lerna',
        role: 'contributor',
        pullRequests: [
          {
            number: 4168,
            type: 'fix',
            title:
              'fix: incorrectly removes `package-lock.json` dependencies on `lerna version`',
            highlight: true,
            merged: false,
          },
          {
            number: 4105,
            type: 'docs',
            title: 'docs: fixed some typos',
            merged: true,
          },
          {
            number: 4107,
            type: 'docs',
            title: 'docs: fix broken links and add some links in `distribute-tasks.md`',
            merged: true,
          },
          {
            number: 4115,
            type: 'docs',
            title: 'docs: fix simple typos in `import/README.md`',
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'llvm',
    repositories: [
      {
        name: 'llvm-project',
        role: 'contributor',
        pullRequests: [
          {
            number: 117730,
            type: 'fix',
            title:
              '[clang-format] fix: add missing `default_extensions` values to `git-clang-format`',
            highlight: true,
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'eslint',
    repositories: [
      {
        name: 'eslint',
        role: 'contributor',
        pullRequests: [
          {
            number: 19604,
            type: 'feat',
            title: 'feat: support `JSRuleDefinition` type',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 19165,
            type: 'chore',
            title: 'chore: add `repository.directory` property to `package.json`',
            merged: true,
          },
          {
            number: 19218,
            type: 'chore',
            title: 'chore: fix incorrect `name` property in `integration-tutorial-code`',
            merged: true,
          },
          {
            number: 19226,
            type: 'chore',
            title: 'chore: add missing backticks to `flags.js`',
            merged: true,
          },
          {
            number: 19270,
            type: 'chore',
            title: 'chore: add `border-radius` to `hX:target` selector styles',
            highlight: true,
            merged: true,
          },
          {
            number: 19314,
            type: 'chore',
            title:
              'chore: extract package `name` from `package.json` for public interface',
            highlight: true,
            merged: true,
          },
          {
            number: 19175,
            type: 'docs',
            title: 'docs: delete unnecessary horizontal rule(`---`) in `nodejs-api`',
            merged: true,
          },
          {
            number: 19176,
            type: 'docs',
            title: 'docs: delete unnecessary horizontal rule(`---`) (v8.x) (follow up)',
            merged: true,
          },
          {
            number: 19179,
            type: 'docs',
            title: 'docs: fix a typo in `debug.md`',
            merged: true,
          },
          {
            number: 19180,
            type: 'docs',
            title: 'docs: fix typos in `migration-guide.md`',
            merged: true,
          },
          {
            number: 19186,
            type: 'docs',
            title: 'docs: add backtick in `-0` in `description` of `no-compare-neg-zero`',
            merged: true,
          },
          {
            number: 19188,
            type: 'docs',
            title: 'docs: add missing backtick to `no-async-promise-executor.md`',
            merged: true,
          },
          {
            number: 19189,
            type: 'docs',
            title: 'docs: switch the order of words in `no-unreachable.md`',
            merged: true,
          },
          {
            number: 19190,
            type: 'docs',
            title: 'docs: fix typos in `use-isnan.md`',
            merged: true,
          },
          {
            number: 19199,
            type: 'docs',
            title:
              'docs: replace quote with backtick in `description` of `for-direction`',
            merged: true,
          },
          {
            number: 19161,
            type: 'docs',
            title: 'docs: add missing punctuation in document',
            merged: true,
          },
          {
            number: 19202,
            type: 'docs',
            title: 'docs: add missing backtick to `default-case-last`',
            merged: true,
          },
          {
            number: 19203,
            type: 'docs',
            title: 'docs: update comments and `description` of `no-script-url`',
            merged: true,
          },
          {
            number: 19205,
            type: 'docs',
            title: 'docs: update docs and `description` of `require-unicode-regexp`',
            merged: true,
          },
          {
            number: 19206,
            type: 'docs',
            title: 'docs: add missing backticks to `prefer-object-spread`',
            merged: true,
          },
          {
            number: 19207,
            type: 'docs',
            title: 'docs: add missing backticks to `eqeqeq.md`',
            merged: true,
          },
          {
            number: 19213,
            type: 'docs',
            title: 'docs: add missing `)` to `id-denylist.md`',
            merged: true,
          },
          {
            number: 19214,
            type: 'docs',
            title: 'docs: add missing backticks to `complexity.md`',
            merged: true,
          },
          {
            number: 19217,
            type: 'docs',
            title: 'docs: add missing backticks to `id-length.md`',
            merged: true,
          },
          {
            number: 19219,
            type: 'docs',
            title: 'docs: add missing backticks to `no-new-func.md`',
            merged: true,
          },
          {
            number: 19222,
            type: 'docs',
            title: 'docs: add missing backticks to `no-unneeded-ternary.md`',
            merged: true,
          },
          {
            number: 19223,
            type: 'docs',
            title: 'docs: add missing backticks to `prefer-destructuring`',
            merged: true,
          },
          {
            number: 19220,
            type: 'docs',
            title: 'docs: add missing backticks to `no-param-reassign.md`',
            merged: true,
          },
          {
            number: 19224,
            type: 'docs',
            title: 'docs: add missing `<h2>`(`##`) to `prefer-spread`',
            merged: true,
          },
          {
            number: 19227,
            type: 'docs',
            title: 'docs: add missing backticks to `func-style`',
            merged: true,
          },
          {
            number: 19233,
            type: 'docs',
            title: 'docs: add missing backticks to `no-sequences`',
            merged: true,
          },
          {
            number: 19230,
            type: 'docs',
            title: 'docs: update `yoda` to `Yoda` in `yoda.md` for consistency',
            merged: true,
          },
          {
            number: 19269,
            type: 'docs',
            title: 'docs: add missing backticks in various parts of the documentation',
            merged: true,
          },
          {
            number: 19282,
            type: 'docs',
            title: 'docs: add missing backticks to `sort-imports`',
            merged: true,
          },
          {
            number: 19309,
            type: 'docs',
            title: 'docs: add missing backticks to `no-else-return.md`',
            merged: true,
          },
          {
            number: 19310,
            type: 'docs',
            title: 'docs: add `related_rules` front matter to `no-eq-null.md`',
            merged: true,
          },
          {
            number: 19311,
            type: 'docs',
            title: 'docs: add missing backticks to `default-case-last.js`',
            merged: true,
          },
          {
            number: 19313,
            type: 'docs',
            title: 'docs: add missing backticks to `no-void.md`',
            merged: true,
          },
        ],
        issues: [
          {
            number: 19519,
            type: 'feat',
            title:
              'Change Request: Support nested configuration object types in ESLint plugin configs',
          },
          {
            number: 19521,
            type: 'feat',
            title: 'Change Request: Support generic types for `Rule.RuleModule` type',
          },
          {
            number: 19523,
            type: 'feat',
            title: 'Change Request: Support `name` field to `meta.docs`',
          },
        ],
        pullRequestComments: [
          {
            number: 19185,
            type: 'chore',
            title: 'chore: Upgrade cross-spawn to 7.0.6',
            fragment: 'issuecomment-2512056279',
          },
        ],
      },
      {
        name: 'markdown',
        role: 'contributor',
        pullRequests: [
          {
            number: 328,
            type: 'feat',
            title: 'feat: support front matter',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 332,
            type: 'feat',
            title: 'feat: support `eslint` config comments',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 334,
            type: 'feat',
            title: 'feat: add missing `mdast` types to `MarkdownRuleVisitor`',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 336,
            type: 'fix',
            title: 'fix: replace `IMarkdownSourceCode` with `MarkdownSourceCode`',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 329,
            type: 'test',
            title: 'test: create tests for `MarkdownLanguage`',
            highlight: true,
            merged: true,
          },
          {
            number: 337,
            type: 'chore',
            title: 'chore: create `PULL_REQUEST_TEMPLATE.md`',
            merged: true,
          },
          {
            number: 342,
            type: 'docs',
            title: 'docs: fix inaccurate description in `no-html.md`',
            merged: true,
          },
          {
            number: 343,
            type: 'chore',
            title: 'chore: add eslint fix command for Markdown files in lint-staged',
            merged: true,
          },
          {
            number: 344,
            type: 'fix',
            title:
              'fix: enhance fenced code language rule to support tilde as a delimiter',
            description: 'contributor pool',
            highlight: true,
            merged: true,
          },
          {
            number: 345,
            type: 'chore',
            title: 'chore: bump `@eslint/core` and `@eslint/plugin-kit` to latest',
            merged: true,
          },
        ],
        issues: [
          {
            number: 311,
            type: 'feat',
            title:
              'New Rule: Suggest rules for working with natural language, similar to `textlint`',
          },
          {
            number: 323,
            type: 'fix',
            title:
              'Bug: ESLint built-in types are not compatible with `mdast` node types',
          },
          {
            number: 325,
            type: 'feat',
            title: 'Change Request: Support Front Matter',
          },
          {
            number: 330,
            type: 'feat',
            title: 'Change Request: Support `applyInlineConfig`',
          },
          {
            number: 331,
            type: 'feat',
            title: 'Change Request: Support Math',
          },
          {
            number: 339,
            type: 'refactor',
            title: 'Rule Change: Support `language` and `dialects` to `meta`',
          },
          {
            number: 340,
            type: 'feat',
            title: 'Change Request: Add more methods to `MarkdownSourceCode` class',
          },
          {
            number: 341,
            type: 'feat',
            title: 'Change Request: Narrowing the type in `MarkdownSourceCode`',
          },
        ],
        pullRequestComments: [
          {
            number: 324,
            type: 'fix',
            title: 'fix: provide a language-specific definition for `RuleModule`',
            fragment: 'discussion_r1995682169',
          },
        ],
        issueComments: [
          {
            number: 294,
            type: 'fix',
            title: 'Bug: False positive `markdown/no-missing-label-refs` on GFM Alerts',
            fragment: 'issuecomment-2763192768',
            highlight: true,
          },
          {
            number: 335,
            title: 'Bug: False positive with no-missing-label-refs on checkboxes',
            fragment: 'issuecomment-2804399639',
          },
        ],
      },
      {
        name: 'rewrite',
        issues: [
          {
            number: 166,
            type: 'feat',
            title:
              'Change Request: Support `getLocFromIndex()` and `getIndexFromLoc()` methods for `TextSourceCodeBase` class',
          },
          {
            number: 175,
            type: 'fix',
            title:
              'Change Request: Support `getParent`, `getAncestors`, `getText` and `lines` as a optional values for `SourceCodeBase` interface',
          },
        ],
      },
      {
        name: 'eslint.org',
        issues: [
          {
            number: 662,
            type: 'feat',
            title: 'Suggestion: Add `border-radius` property to `hX:target` selectors',
          },
        ],
      },
      {
        name: 'json',
        pullRequests: [
          {
            number: 92,
            type: 'test',
            title: 'test: create tests for `JSONRuleDefinition`',
            highlight: true,
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'actions',
    repositories: [
      {
        name: 'runner-images',
        role: 'contributor',
        pullRequests: [
          {
            number: 10689,
            type: 'docs',
            title: 'docs(typo): fix typo in README.md',
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'nodejs',
    repositories: [
      {
        name: 'nodejs.org',
        role: 'contributor',
        pullRequests: [
          {
            number: 7539,
            type: 'docs',
            title: 'docs: add missing backticks to `introduction-to-nodejs.md`',
            merged: true,
          },
        ],
      },
      {
        name: 'node',
        pullRequestComments: [
          {
            number: 55201,
            title: 'tools: update clang-format to v19',
            highlight: true,
            fragment: 'issuecomment-2431553348',
          },
        ],
      },
    ],
  },

  {
    name: 'algolia',
    repositories: [
      {
        name: 'docsearch',
        role: 'contributor',
        pullRequests: [
          {
            number: 2359,
            type: 'style',
            title: 'refactor: improve readability of `_variables.css`',
            merged: true,
          },
          {
            number: 2372,
            type: 'chore',
            title: 'chore: add `repository.directory` property to `package.json`',
            merged: true,
          },
          {
            number: 2377,
            type: 'chore',
            title:
              'chore: add `--host` option to `playground:start` script in `package.json`',
            merged: true,
          },
        ],
        issues: [
          {
            number: 2364,
            type: 'fix',
            title:
              "Please adding a support for Next.js's soft navigation using `<Link>` component",
          },
          {
            number: 2367,
            type: 'fix',
            title:
              'Bug: Text not being entered correctly in the search bar on Android (Samsung) IME',
          },
        ],
      },
    ],
  },

  {
    name: 'textlint',
    repositories: [
      {
        name: 'textlint',
        role: 'contributor',
        pullRequests: [
          {
            number: 1459,
            type: 'feat',
            title:
              'feat(@textlint/ast-node-types): add missing `LinkReference`, `ImageReference` and `Definition` node types',
            highlight: true,
            merged: true,
            releases: ['v14.5.0'],
          },
          {
            number: 1425,
            type: 'docs',
            title: 'docs(image): make the border of get-started-steps images transparent',
            merged: true,
            releases: ['v14.2.1'],
          },
        ],
        issueComments: [
          {
            number: 1406,
            type: 'refactor',
            title: "Some internal modules (try-resolve@1.0.1) are 'deprecated'",
            fragment: 'issuecomment-2375829209',
          },
        ],
      },
    ],
  },

  {
    name: 'toss',
    repositories: [
      {
        name: 'es-hangul',
        role: 'contributor',
        pullRequests: [
          {
            number: 276,
            type: 'docs',
            title: 'docs: fix a typo in `standardizePronunciation.ko.mdx`',
            merged: true,
          },
          {
            number: 277,
            type: 'docs',
            title: 'docs: fix typos in `introduction.ko.mdx`',
            merged: true,
          },
          {
            number: 293,
            type: 'docs',
            title: 'docs: create `removeLastCharacter` documentation',
            highlight: true,
            merged: true,
          },
        ],
        issues: [
          {
            number: 278,
            type: 'docs',
            title: '[Docs]: `removeLastCharacter` 문서 누락',
          },
        ],
        issueComments: [
          {
            number: 196,
            type: 'feat',
            title: '[Feature]: 욕 마스킹 기능이 있으면 좋을 것 같아요',
            fragment: 'issuecomment-2559653065',
          },
        ],
      },
    ],
  },

  {
    name: 'material-extensions',
    repositories: [
      {
        name: 'vscode-material-icon-theme',
        role: 'contributor',
        pullRequests: [
          {
            number: 2565,
            type: 'feat',
            title: 'feat: ✨ .markdownlintignore file icon',
            highlight: true,
            merged: true,
          },
          {
            number: 2580,
            type: 'feat',
            title: 'feat: ✨ .clang-format-ignore file icon',
            highlight: true,
            merged: true,
          },
          {
            number: 2665,
            type: 'feat',
            title: 'feat: ✨ `.editorconfig-checker.json` and `.ecrc` file icon',
            highlight: true,
            merged: true,
          },
          {
            number: 2825,
            type: 'feat',
            title: 'feat: add `websites` folder icon',
            merged: true,
          },
          {
            number: 2566,
            type: 'docs',
            title: 'docs: 📝 fix broken links in pull_request_template',
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'pronist',
    repositories: [
      {
        name: 'hello',
        role: 'contributor',
        pullRequests: [
          {
            number: 229,
            type: 'fix',
            title: 'fix: `.github/workflows/tidory.yml` CI environment',
            highlight: true,
            merged: true,
          },
        ],
      },
      {
        name: 'tidory',
        role: 'contributor',
        pullRequests: [
          {
            number: 15,
            type: 'fix',
            title: 'fix: `.github/workflows/tidory.yml` CI environment',
            highlight: true,
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'mdn',
    repositories: [
      {
        name: 'translated-content',
        role: 'contributor',
        pullRequests: [
          {
            number: 26049,
            type: 'docs',
            title: 'docs: fix typos in `websockets_api/index.md`',
            merged: true,
          },
          {
            number: 26048,
            type: 'docs',
            title: 'docs: fix typos in `http/session/index.md`',
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'editorconfig-checker',
    repositories: [
      {
        name: 'editorconfig-checker',
        issues: [
          {
            number: 409,
            type: 'fix',
            title: '⚠️Run fails after v3.1.0 in `editorconfig-checker.javascript`',
            highlight: true,
          },
          {
            number: 415,
            type: 'fix',
            title: '⚠️Error: Please support `.tar.gz` binary asset for Windows',
            highlight: true,
          },
        ],
      },
      {
        name: 'editorconfig-checker.javascript',
        role: 'contributor',
        pullRequests: [
          {
            number: 417,
            type: 'fix',
            title: 'fix: add support for `.zip` files in binary download',
            highlight: true,
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'sindresorhus',
    repositories: [
      {
        name: 'yocto-spinner',
        role: 'contributor',
        pullRequests: [
          {
            number: 3,
            type: 'fix',
            title:
              'fix: update `clear()` method to return `this` to support method chaining',
            highlight: true,
            merged: true,
          },
          {
            number: 5,
            type: 'fix',
            title: 'fix: ensure default value is correctly applied in setter',
            highlight: true,
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'yuyinws',
    repositories: [
      {
        name: 'vitepress-plugin-group-icons',
        role: 'contributor',
        pullRequests: [
          {
            number: 14,
            type: 'feat',
            title: 'feat: add `.mts` and `.cts` extensions to `builtin.ts`',
            highlight: true,
            merged: true,
            releases: ['v1.3.7'],
          },
        ],
      },
    ],
  },

  {
    name: 'xvzc',
    repositories: [
      {
        name: 'boj-cli',
        role: 'contributor',
        pullRequests: [
          {
            number: 32,
            type: 'docs',
            title: 'docs: correct typos in `README.md` and `config_example.yaml`',
            merged: true,
          },
        ],
      },
    ],
  },

  {
    name: 'tidory',
    repositories: [
      {
        name: 'tidory.github.io',
        description:
          'NOTE: The original repository has been deleted. You can check the original commits in my forked repository. [fork-tidory.github.io](https://github.com/lumirlumir/fork-tidory.github.io)',
        role: 'contributor',
        pullRequests: [
          {
            number: 162,
            type: 'docs',
            title: 'docs(typo): typo in framework.md',
            description:
              '[forked-commit](https://github.com/lumirlumir/fork-tidory.github.io/commit/51300808a4abac516b201e87c9a9c58ba658d518)',
            merged: true,
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------------
  // Only Issues
  // ------------------------------------------------------------------------------

  {
    name: 'prettier',
    repositories: [
      {
        name: 'prettier',
        issues: [
          {
            number: 17094,
            title: '`v3.5.0` is a BREAKING CHANGE',
          },
        ],
      },
    ],
  },

  {
    name: 'vuejs',
    repositories: [
      {
        name: 'vitepress',
        issues: [
          {
            number: 4526,
            type: 'feat',
            title: 'Feature: Add Google Analytics Meta Tags Generating Function',
          },
        ],
      },
    ],
  },
];
