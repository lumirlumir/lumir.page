/**
 * @fileoverview Type test for `dialog.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ComponentProps, type ReactElement } from 'react';
import { Dialog, type DialogHandle, type DialogProps } from './dialog.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

let props: DialogProps;

props = { trigger: 'Open', children: 'Content' };
props = {
  trigger: <span>Open</span>,
  children: ({ close }) => (
    <button type="button" onClick={close}>
      Close
    </button>
  ),
};
props = {
  trigger: 'Open',
  triggerProps: { 'aria-label': 'Open dialog', disabled: true },
  children: 'Content',
  'aria-label': 'Dialog',
  closedby: 'any',
};

// @ts-expect-error - `trigger` is required.
props = { children: 'Content' };
// @ts-expect-error - `children` are required.
props = { trigger: 'Open' };
// @ts-expect-error - The trigger cannot have a submit type.
props = { trigger: 'Open', triggerProps: { type: 'submit' }, children: 'Content' };
// @ts-expect-error - `closedby` accepts native dialog values only.
props = { trigger: 'Open', children: 'Content', closedby: 'invalid' };

({}) as Parameters<typeof Dialog>[0] satisfies DialogProps;
({}) as ComponentProps<typeof Dialog> satisfies DialogProps;
({}) as ReturnType<typeof Dialog> satisfies ReactElement;
({}) as DialogHandle satisfies { open: () => void; close: () => void };

function DialogTypeTest() {
  return [
    <Dialog key="plain" trigger="Open">
      Content
    </Dialog>,
    <Dialog key="content" trigger="Open" closedby="any">
      {({ close }) => (
        <button type="button" onClick={close}>
          Cancel
        </button>
      )}
    </Dialog>,
  ];
}
