/**
 * @fileoverview config-context.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  createContext,
  use,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Interview configuration state.
 */
export interface Config extends Record<QuestionType, boolean> {
  /**
   * Visibility of the configuration.
   * @default false
   */
  visibility: boolean;

  /**
   * Main question number.
   * @default 0
   */
  main: number;

  /**
   * Sub question number.
   * @default 0
   */
  sub: number;

  /**
   * Time limit for each question in minutes.
   * @default 0
   */
  time: number;
}

/**
 * Question type keys that can be enabled for an interview.
 */
export type QuestionType = (typeof questionTypes)[number];

/**
 * Defines the shape of the configuration context value provided by the `ConfigContext`,
 * including the current configuration state, its update function, and whether it's complete.
 */
export interface ConfigContextValue {
  /**
   * Current interview configuration.
   */
  readonly config: Config;

  /**
   * Whether the required interview configuration is complete.
   */
  readonly isConfigDone: boolean;

  /**
   * Sets the interview configuration.
   */
  readonly setConfig: Dispatch<SetStateAction<Config>>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);
ConfigContext.displayName = 'ConfigContext';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Ordered question type keys used by configuration controls.
 */
export const questionTypes = ['cs', 'fe', 'be', 'db', 'oop'] as const;

/**
 * Returns the current configuration context value.
 *
 * @returns The current configuration state and helper functions.
 * @throws {Error} Throws when called outside of `ConfigProvider`.
 */
export function useConfigContext(): ConfigContextValue {
  const context = use(ConfigContext);

  if (!context) {
    throw new Error('`useConfigContext` must be used within a `ConfigProvider`.');
  }

  return context;
}

/**
 * Provides interview configuration state and helpers to descendants.
 *
 * @param props The component props.
 * @param props.children The child elements that should receive config context.
 * @returns A context provider wrapping the given children.
 */
export function ConfigProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<Config>({
    visibility: false,
    cs: false,
    fe: false,
    be: false,
    db: false,
    oop: false,
    main: 0,
    sub: 0,
    time: 0,
  });

  const isConfigDone =
    questionTypes.some(key => config[key]) &&
    config.main > 0 &&
    config.sub > 0 &&
    config.time > 0;

  return (
    // eslint-disable-next-line react-x/no-unstable-context-value -- React Compiler automatically optimizes context values.
    <ConfigContext value={{ config, isConfigDone, setConfig }}>{children}</ConfigContext>
  );
}
