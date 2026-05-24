import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

if (existsSync(resolve(import.meta.dirname, '.env'))) {
  loadEnvFile(resolve(import.meta.dirname, '.env'));
}

export default defineConfig({
  build: {
    outDir: 'build',
  },
  define: {
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              panicThreshold: 'critical_errors',
            },
          ],
        ],
      },
    }),
  ],
  preview: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
});
