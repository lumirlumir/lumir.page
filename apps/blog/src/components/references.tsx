/**
 * @fileoverview references.
 */

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'server-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatterMeta } from '@/data/frontmatter';
import type { PropsWithLang } from '@/data/lang';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function References({
  lang,
  references,
}: PropsWithLang<{ readonly references: readonly string[] }>) {
  if (references.length === 0) return null;

  return (
    <div className="markdown">
      <br />
      <h2 id="references">{frontmatterMeta.references.name[lang]}</h2>
      <ul>
        {references.map(reference => (
          <li key={reference}>
            <a href={reference}>{reference}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
