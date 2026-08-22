/**
 * @fileoverview Entry point for the application.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from '@/contexts/config';
import { InterviewProvider } from '@/contexts/interview';
import { ScenarioProvider } from '@/contexts/scenario';

import App from './app';

import '@/styles/index.css';

// --------------------------------------------------------------------------------
// Render
// --------------------------------------------------------------------------------

createRoot(document.getElementById('app') as HTMLDivElement).render(
  <StrictMode>
    <ConfigProvider>
      <InterviewProvider>
        <ScenarioProvider>
          <App />
        </ScenarioProvider>
      </InterviewProvider>
    </ConfigProvider>
  </StrictMode>,
);
