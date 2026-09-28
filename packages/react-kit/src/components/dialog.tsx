/**
 * @fileoverview Headless native dialog with a trigger button.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  type ButtonHTMLAttributes,
  type DialogHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the unstyled `Dialog` component.
 */
export interface DialogProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'children' | 'open'
> {
  /**
   * Content of the trigger button.
   */
  trigger: ReactNode;

  /**
   * Attributes for the trigger button. Its type is always `button`.
   */
  triggerProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'onClick' | 'type'
  >;

  /**
   * Ref to the native dialog for opening it from a shortcut or closing it from content.
   */
  dialogRef?: RefObject<HTMLDialogElement | null>;

  /**
   * Dialog content.
   */
  children: ReactNode;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders an unstyled trigger button and native modal dialog.
 *
 * @example
 * ```tsx
 * const dialogRef = useRef<HTMLDialogElement>(null);
 *
 * <Dialog dialogRef={dialogRef} trigger="Search" aria-label="Search" closedby="any">
 *   <input />
 *   <button type="button" onClick={() => dialogRef.current?.close()}>Cancel</button>
 * </Dialog>
 * ```
 */
export function Dialog({
  trigger,
  triggerProps,
  dialogRef,
  children,
  ...dialogProps
}: DialogProps) {
  function openDialog(event: MouseEvent<HTMLButtonElement>) {
    const dialog = event.currentTarget.nextElementSibling;

    if (dialog instanceof HTMLDialogElement && !dialog.open) {
      dialog.showModal();
    }
  }

  return (
    <>
      <button {...triggerProps} type="button" onClick={openDialog}>
        {trigger}
      </button>
      <dialog {...dialogProps} ref={dialogRef}>
        {children}
      </dialog>
    </>
  );
}
