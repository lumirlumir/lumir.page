/**
 * @fileoverview Dialog component.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Defines the shape of the context value provided by the `DialogContext`,
 * including the dialog reference and the open/close methods.
 */
interface DialogContextValue extends DialogHandle {
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
}

export interface DialogHandle {
  readonly open: () => void;
  readonly close: () => void;
}

export interface DialogRootProps {
  readonly children: ReactNode;
  readonly ref?: Ref<DialogHandle>;
  readonly initialFocusRef?: RefObject<HTMLElement | null>;
}

export type DialogContentProps = ComponentPropsWithoutRef<'dialog'>;

export type DialogOpenProps = Omit<ComponentPropsWithRef<'button'>, 'type'>;

export type DialogCloseProps = Omit<ComponentPropsWithRef<'button'>, 'type'>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog components must be used within `Dialog.Root`');
  }

  return context;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export function DialogRoot({ children, ref, initialFocusRef }: DialogRootProps) {
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

    if (dialog === null) {
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, []);

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <DialogContext
      value={useMemo(() => ({ dialogRef, open, close }), [dialogRef, open, close])}
    >
      {children}
    </DialogContext>
  );
}

export function DialogContent({ closedby = 'any', ...props }: DialogContentProps) {
  const { dialogRef } = useDialogContext();

  return <dialog {...props} ref={dialogRef} closedby={closedby} />;
}

export function DialogOpen({ onClick, ...props }: DialogOpenProps) {
  const { open } = useDialogContext();

  return (
    <button
      {...props}
      type="button"
      onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) open();
      }}
    />
  );
}

export function DialogClose({ onClick, ...props }: DialogCloseProps) {
  const { close } = useDialogContext();

  return (
    <button
      {...props}
      type="button"
      onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
    />
  );
}

export const Dialog = {
  Root: DialogRoot,
  Content: DialogContent,
  Open: DialogOpen,
  Close: DialogClose,
} as const;
