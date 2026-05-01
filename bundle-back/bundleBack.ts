// oxlint-disable no-console
import esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import { pathAliasPlugin } from './pathAliasPlugin'

const rootPathAbsolute = path.resolve(import.meta.dirname, '..')
const indexSrcFilePath = path.join(rootPathAbsolute, 'back', 'index.ts')
const outDirPath = path.join(rootPathAbsolute, 'back', 'build')
const nodeModulesDirPath = path.join(rootPathAbsolute, 'back', 'node_modules')
const indexDistFilePath = path.join(outDirPath, 'index.js')

console.log('\n🧹 Cleaning build directory...')

fs.rmSync(outDirPath, { recursive: true, force: true })

console.log('\n✅ Cleaned!')

console.log('\n🗣️  Bundling backend...')

// https://esbuild.github.io/api
await esbuild.build({
  entryPoints: [indexSrcFilePath],
  outfile: indexDistFilePath,
  bundle: true,
  nodePaths: [nodeModulesDirPath],
  platform: 'node',
  target: 'node22',
  format: 'esm',
  sourcemap: false,
  minify: false,
  treeShaking: true,
  packages: 'external',
  loader: { '.html': 'text' },
  plugins: [pathAliasPlugin],
  logLevel: 'info',
})
