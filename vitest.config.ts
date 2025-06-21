import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
}); 