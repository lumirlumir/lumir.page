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
 * Configuration Object.
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

export type QuestionType = (typeof questionTypes)[number];

export type ConfigContextValue = {
  readonly configState: Config;
  readonly updateConfig: (config: Partial<Config>) => void;
  readonly isConfigDone: () => boolean;
};

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const questionTypes = ['cs', 'fe', 'be', 'db', 'oop'] as const;

export function useConfigContext(): ConfigContextValue {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error('`useConfigContext` must be used within a `ConfigProvider`.');
  }

  return context;
}

export function ConfigProvider({ children }: PropsWithChildren) {
  const [configState, setConfigState] = useState<Config>({
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

  const updateConfig = (config: Partial<Config>) => {
    setConfigState(prevState => ({
      ...prevState,
      ...config,
    }));
  };

  const isConfigDone = () => {
    const { cs, fe, be, db, oop, main, sub, time } = configState;

    return Boolean((cs || fe || be || db || oop) && main && sub && time);
  };

  return (
    <ConfigContext value={{ configState, updateConfig, isConfigDone }}>
      {children}
    </ConfigContext>
  );
}
