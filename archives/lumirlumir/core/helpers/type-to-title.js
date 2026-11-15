/**
 * @fileoverview Transform `type` string to `title` string
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../../types/index.d.ts').Type} Type
 */

/**
 * @typedef {object} Options
 * @property {boolean} [emoji]
 * @property {boolean} [title]
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/** @param {string} emoji @param {string} title @param {Options} options */
function emojiTitle(
  emoji,
  title,
  { emoji: emojiOpt = true, title: titleOpt = true } = {},
) {
  if (emojiOpt && titleOpt) {
    return `${emoji} ${title}`;
  } else if (emojiOpt) {
    return emoji;
  } else if (titleOpt) {
    return title;
  } else {
    return '';
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Transform `type` string to `title` string.
 * @param {Type} type
 * @param {Options} [options]
 */
export default function typeToTitle(type, options = {}) {
  switch (type) {
    case 'feat':
      return emojiTitle(':sparkles:', 'Features', options);
    case 'fix':
      return emojiTitle(':bug:', 'Bug Fixes', options);
    case 'build':
      return emojiTitle(':hammer_and_wrench:', 'Builds', options);
    case 'chore':
      return emojiTitle(':toolbox:', 'Chores', options);
    case 'ci':
      return emojiTitle(':arrows_counterclockwise:', 'Continuous Integrations', options);
    case 'docs':
      return emojiTitle(':memo:', 'Documentation', options);
    case 'perf':
      return emojiTitle(':zap:', 'Performance Improvements', options);
    case 'refactor':
      return emojiTitle(':recycle:', 'Code Refactoring', options);
    case 'style':
      return emojiTitle(':art:', 'Styles', options);
    case 'test':
      return emojiTitle(':test_tube:', 'Tests', options);
    default:
      return emojiTitle(':unicorn:', 'Others', options);
  }
}
