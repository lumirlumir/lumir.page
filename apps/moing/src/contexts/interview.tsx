/**
 * @fileoverview interview-context.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createContext, useContext, type PropsWithChildren } from 'react';

import useInterview from '@/hooks/use-interview';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Defines the interview state and actions provided by the `InterviewContext`.
 */
export type InterviewContextValue = ReturnType<typeof useInterview<HTMLDivElement>>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const InterviewContext = createContext<InterviewContextValue | undefined>(undefined);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Returns the current interview state and actions.
 *
 * @returns The current interview state and actions.
 * @throws {Error} Throws when called outside of `InterviewProvider`.
 */
export function useInterviewContext(): InterviewContextValue {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error('`useInterviewContext` must be used within an `InterviewProvider`.');
  }

  return context;
}

/**
 * Provides interview state and actions to descendants.
 *
 * @param props The component props.
 * @param props.children The child elements that should receive interview state.
 * @returns A context provider wrapping the given children.
 */
export function InterviewProvider({ children }: PropsWithChildren) {
  const interview = useInterview<HTMLDivElement>();

  return <InterviewContext value={interview}>{children}</InterviewContext>;
}
