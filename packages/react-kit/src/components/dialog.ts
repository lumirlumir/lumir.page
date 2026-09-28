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
  createElement,
  Fragment,
  useCallback,
  useImperativeHandle,
  useRef,
  type ButtonHTMLAttributes,
  type DialogHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Methods for controlling a `Dialog` without clicking its trigger.
 */
export interface DialogHandle {
  open: () => void;
  close: () => void;
}

/**
 * Props for the unstyled `Dialog` component.
 */
export interface DialogProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'children'
> {
  /**
   * Content of the trigger button.
   */
  trigger: ReactNode;

  /**
   * Attributes for the trigger button. Its type is always `button`.
   */
  triggerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>;

  /**
   * Dialog content. Use a function to access the open and close methods.
   */
  children: ReactNode | ((handle: DialogHandle) => ReactNode);

  /**
   * Element to focus after opening the dialog.
   */
  initialFocusRef?: RefObject<HTMLElement | null>;

  /**
   * Imperative methods for opening and closing the dialog.
   */
  ref?: Ref<DialogHandle>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Renders an unstyled button and native modal dialog. The browser handles
 * modal focus trapping and Escape; `closedby="any"` also enables light dismiss.
 *
 * @example
 * ```tsx
 * const dialogRef = useRef<DialogHandle>(null);
 * const inputRef = useRef<HTMLInputElement>(null);
 *
 * <Dialog
 *   ref={dialogRef}
 *   trigger="Search"
 *   triggerProps={{ 'aria-label': 'Open search' }}
 *   aria-label="Search"
 *   closedby="any"
 *   initialFocusRef={inputRef}
 * >
 *   {({ close }) => (
 *     <>
 *       <input ref={inputRef} />
 *       <button type="button" onClick={close}>Cancel</button>
 *     </>
 *   )}
 * </Dialog>
 * ```
 */
export function Dialog({
  trigger,
  triggerProps,
  children,
  initialFocusRef,
  ref,
  ...dialogProps
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    initialFocusRef?.current?.focus();
  }, [initialFocusRef]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }, []);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  /* eslint-disable react-hooks/refs -- The handlers passed to createElement read the dialog ref only after an interaction. */
  return createElement(
    Fragment,
    null,
    createElement(
      'button',
      {
        ...triggerProps,
        type: 'button',
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          triggerProps?.onClick?.(event);

          if (!event.defaultPrevented) {
            open();
          }
        },
      },
      trigger,
    ),
    createElement(
      'dialog',
      { ...dialogProps, ref: dialogRef },
      typeof children === 'function' ? children({ open, close }) : children,
    ),
  );
  /* eslint-enable react-hooks/refs */
}
