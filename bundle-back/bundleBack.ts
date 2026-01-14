import esbuild from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathAliasPlugin } from './pathAliasPlugin'
import { z } from 'zod'

const thisDirPathAbsolute = path.dirname(fileURLToPath(import.meta.url))
const rootPathAbsolute = path.resolve(thisDirPathAbsolute, '..')

console.info('\nBundling backend...')

// Read package.json to get all dependencies
const backPackageJsonRaw: unknown = JSON.parse(
  readFileSync(path.resolve(rootPathAbsolute, 'back/package.json'), 'utf8'),
)

const packageJsonSchema = z.looseObject({
  dependencies: z.record(z.string(), z.any()),
})

const backPackageJsonRawParsedResult =
  packageJsonSchema.safeParse(backPackageJsonRaw)

if (backPackageJsonRawParsedResult.success === false) {
  throw new Error('package.json is broken')
}

const packageDependencyList = Object.keys(
  backPackageJsonRawParsedResult.data.dependencies,
)

// Create a temporary entry file
// Export all dependencies so esbuild creates a shared chunk for all deps
// Using export ensures esbuild doesn't tree-shake them away
const reExportDependenciesContent = packageDependencyList
  .map((dep, index) => `export * as dep${index} from '${dep}';`)
  .join('\n')

const dependenciesEntryPath = path.resolve(
  rootPathAbsolute,
  'back',
  '.deps-entry.js',
)

writeFileSync(dependenciesEntryPath, reExportDependenciesContent)

const indexTsPath = path.resolve(rootPathAbsolute, 'back', 'index.ts')
const outDirPath = path.resolve(rootPathAbsolute, 'back/build')

await esbuild.build({
  entryPoints: [
    indexTsPath,
    dependenciesEntryPath, // Forces deps into shared chunk
  ],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outdir: outDirPath,
  splitting: true,
  chunkNames: '[name]-[hash]',
  sourcemap: false,
  minify: false,
  treeShaking: true,
  loader: {
    '.html': 'text',
  },
  plugins: [pathAliasPlugin],
  logLevel: 'info',
  metafile: true,
})
