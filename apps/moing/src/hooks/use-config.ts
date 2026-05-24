/**
 * @fileoverview use-config
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

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

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const questionTypes = ['cs', 'fe', 'be', 'db', 'oop'] as const;

export default function useConfig() {
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

  const handleConfigState = (obj: Partial<Config>) => {
    setConfigState(prevState => ({
      ...prevState,
      ...obj,
    }));
  };

  const isConfigDone = () => {
    const { cs, fe, be, db, oop, main, sub, time } = configState;

    return (cs || fe || be || db || oop) && main && sub && time;
  };

  return {
    configState,
    handleConfigState,
    isConfigDone,
  };
}
