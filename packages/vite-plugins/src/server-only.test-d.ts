/**
 * @fileoverview Type test for `server-only.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Plugin } from 'vite';
import { vitePluginServerOnly } from './server-only.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region vitePluginServerOnly

vitePluginServerOnly() satisfies Plugin;

// @ts-expect-error - `vitePluginServerOnly` should not accept options.
vitePluginServerOnly({});

// #endregion vitePluginServerOnly
// --------------------------------------------------------------------------------
