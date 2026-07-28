/**
 * @fileoverview Navigation slot for category routes.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Nav from '@/components/layouts/nav';
import Sort from '@/components/nav/sort';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Page() {
  return (
    <Nav>
      <Sort />
    </Nav>
  );
}
