/**
 * @fileoverview Root page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/article';
import { getGithubUsers } from '@/utils/fetch';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page() {
  const { name } = await getGithubUsers();

  return <Article>{`Hello, It's ${name}'s blog!`}</Article>;
}
