/**
 * @fileoverview Type test for `markdown.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { Plugin } from 'vite';
import { vitePluginMarkdown } from './markdown.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// #region vitePluginMarkdown

vitePluginMarkdown() satisfies Promise<Plugin>;

// @ts-expect-error - `vitePluginMarkdown` should not accept options.
vitePluginMarkdown({});

// #endregion vitePluginMarkdown
// --------------------------------------------------------------------------------
