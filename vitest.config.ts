import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'src',
    reporters: ['html', 'verbose'],
    watch: false,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        'html',
        'dist',
      ],
    },
  },
});
