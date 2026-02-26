// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://giulio-leone.github.io',
  base: '/cv',
  outDir: '../docs',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});