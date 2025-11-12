import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', 'dist-electron', 'node_modules', 'release', 'hono/src/generated', 'README.md', 'hono/README.md', 'src/components/ui', 'src/hooks/use-mobile.ts'],
  formatters: true,
  react: true,
}, {
  rules: {
    'node/prefer-global/process': ['off'],
  },
})
