/**
 * @fileoverview Entry point for the application.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from '@/contexts/config-context';
import { ScenarioProvider } from '@/contexts/scenario-context';

import App from './app';

import '@/styles/index.css';

// --------------------------------------------------------------------------------
// Render
// --------------------------------------------------------------------------------

createRoot(document.getElementById('app') as HTMLDivElement).render(
  <StrictMode>
    <ConfigProvider>
      <ScenarioProvider>
        <App />
      </ScenarioProvider>
    </ConfigProvider>
  </StrictMode>,
);
