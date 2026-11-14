import { build, createServer } from 'vite'
import react from '@vitejs/plugin-react'
// Load configuration directly: bundled TS-config resolution cannot enumerate
// the parent home directory in the managed Windows workspace.
const config = { configFile: false, base: './', plugins: [react()], esbuild: { tsconfigRaw: { compilerOptions: { jsx: 'react-jsx', target: 'ES2022' } } } }
if (process.argv.includes('--serve')) {
  const server = await createServer({ ...config, server: { host: '127.0.0.1', port: 5173 } })
  await server.listen()
  server.printUrls()
} else await build(config)
