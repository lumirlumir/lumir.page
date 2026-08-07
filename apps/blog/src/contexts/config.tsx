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
  useMemo,
  useSyncExternalStore,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import { configDefault, configKey, type Config } from '@/data/config';
import { isConfig } from '@/utils/is';

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
const configChangeEvent = `${configKey}-change`;
const configDefaultSnapshot = JSON.stringify(configDefault);

function parseConfig(snapshot: string): Config {
  try {
    const config: unknown = JSON.parse(snapshot);

    if (isConfig(config)) {
      return config;
    }
  } catch {
    // Invalid persisted configurations fall back to the default.
  }

  return configDefault;
}

function getConfigSnapshot(): string {
  return localStorage.getItem(configKey) ?? configDefaultSnapshot;
}

function getServerConfigSnapshot(): string {
  return configDefaultSnapshot;
}

function subscribeConfigStore(onStoreChange: () => void): () => void {
  function onStorageChange(event: StorageEvent) {
    if (event.key === configKey) {
      onStoreChange();
    }
  }

  window.addEventListener('storage', onStorageChange);
  window.addEventListener(configChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStorageChange);
    window.removeEventListener(configChangeEvent, onStoreChange);
  };
}

function setConfig(value: SetStateAction<Config>) {
  const config = parseConfig(getConfigSnapshot());
  const nextConfig = typeof value === 'function' ? value(config) : value;

  localStorage.setItem(configKey, JSON.stringify(nextConfig));
  // Notify the current tab because the `storage` event only fires in other tabs.
  dispatchEvent(new Event(configChangeEvent));
}

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
  const snapshot = useSyncExternalStore(
    subscribeConfigStore,
    getConfigSnapshot,
    getServerConfigSnapshot,
  );
  const config = useMemo(() => parseConfig(snapshot), [snapshot]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values -- React Compiler automatically optimizes context values.
  return <ConfigContext value={[config, setConfig]}>{children}</ConfigContext>;
}
