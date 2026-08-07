/**
 * @fileoverview config-context.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Environment
// --------------------------------------------------------------------------------

import 'client-only';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { configDefault, type Config } from '@/data/config';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Defines the shape of the context value provided by the `ConfigContext`,
 * including the current configuration and its state setter.
 */
export type ConfigContextValue = readonly [
  config: Config,
  setConfig: Dispatch<SetStateAction<Config>>,
];

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Returns the current application configuration context value.
 *
 * @returns A tuple containing the current configuration and its state setter.
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
 * Provides application configuration state to all descendant components.
 *
 * @param props The component props.
 * @param props.children The child elements that should receive configuration state.
 * @returns A context provider wrapping the given children.
 */
export function ConfigProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<Config>(configDefault);

  // eslint-disable-next-line react/jsx-no-constructed-context-values -- React Compiler automatically optimizes context values.
  return <ConfigContext value={[config, setConfig]}>{children}</ConfigContext>;
}
