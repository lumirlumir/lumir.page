/**
 * @fileoverview config-context.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createContext, useContext, useState, type PropsWithChildren } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Interview configuration state.
 */
export interface Config {
  /**
   * Visibility of the configuration.
   * @default false
   */
  visibility: boolean;

  /**
   * Whether the CS question type is selected.
   * @default false
   */
  cs: boolean;

  /**
   * Whether the FE question type is selected.
   * @default false
   */
  fe: boolean;

  /**
   * Whether the BE question type is selected.
   * @default false
   */
  be: boolean;

  /**
   * Whether the DB question type is selected.
   * @default false
   */
  db: boolean;

  /**
   * Whether the OOP question type is selected.
   * @default false
   */
  oop: boolean;

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
 * including the current configuration state and helper functions for updating the config
 * and checking if it's complete.
 */
export interface ConfigContextValue {
  /**
   * Current interview configuration.
   */
  readonly config: Config;

  /**
   * Merges a partial configuration update into the current config state.
   */
  readonly updateConfig: (partialConfig: Partial<Config>) => void;

  /**
   * Returns whether the required interview configuration is complete.
   */
  readonly isConfigDone: () => boolean;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

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
  const context = useContext(ConfigContext);

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

  const updateConfig = (partialConfig: Partial<Config>) => {
    setConfig(prevState => ({
      ...prevState,
      ...partialConfig,
    }));
  };

  const isConfigDone = () => {
    const { cs, fe, be, db, oop, main, sub, time } = config;

    return Boolean((cs || fe || be || db || oop) && main && sub && time);
  };

  return (
    <ConfigContext value={{ config, updateConfig, isConfigDone }}>
      {children}
    </ConfigContext>
  );
}
