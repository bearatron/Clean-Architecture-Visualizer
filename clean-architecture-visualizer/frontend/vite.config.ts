/// <reference types="vitest" />
import { defineConfig } from 'vitest/config' 
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr({include: "**/*.svg?react"})],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    'react': path.resolve(__dirname, 'node_modules/react'),
    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'), // Add this
    '@tanstack/react-query': path.resolve(__dirname, 'node_modules/@tanstack/react-query'),
    '@testing-library/react': path.resolve(__dirname, 'node_modules/@testing-library/react'),
  },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    server: {
      deps: {
        // Prevents Vitest from trying to resolve react-query from the parent node_modules
        inline: [/@tanstack\/react-query/, /msw/],
      },
    },
    // This is the most important part for nested folders:
    root: path.resolve(__dirname, './'), 
  },
})
