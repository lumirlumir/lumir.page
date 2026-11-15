/**
 * @fileoverview Sort contributions by `type`.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../../types/index.d.ts').Contribution} Contribution
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Sort contributions by `type`.
 * @template {Contribution} T
 * @param {Readonly<Array<T>>} contributions
 * @returns {Readonly<Array<T>>}
 */
export default function sortContributions(contributions) {
  const order = [
    'feat',
    'fix',
    'build',
    'chore',
    'ci',
    'docs',
    'perf',
    'refactor',
    'style',
    'test',
  ];

  // @ts-expect-error -- TODO
  return contributions.toSorted((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
}
