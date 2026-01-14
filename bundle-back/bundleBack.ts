import esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { pathAliasPlugin } from './pathAliasPlugin'
import { z } from 'zod'

const thisDirPathAbsolute = path.dirname(url.fileURLToPath(import.meta.url))
const rootPathAbsolute = path.resolve(thisDirPathAbsolute, '..')
const packageJsonFilePath = path.join(rootPathAbsolute, 'back', 'package.json')
const dependenciesEntryPath = path.join(thisDirPathAbsolute, '.deps-entry.js')
const indexTsPath = path.join(rootPathAbsolute, 'back', 'index.ts')
const outDirPath = path.join(rootPathAbsolute, 'back', 'build')
const nodeModulesDirPath = path.join(rootPathAbsolute, 'back', 'node_modules')

console.info('\n🗣️  Bundling backend...')

// Read package.json to get all dependencies
const packageJsonAsText = fs.readFileSync(packageJsonFilePath, 'utf8')
const packageJsonRaw: unknown = JSON.parse(packageJsonAsText)

const packageJsonSchema = z.looseObject({
  dependencies: z.record(z.string(), z.any()),
})

const packageJsonRawParsedResult = packageJsonSchema.safeParse(packageJsonRaw)

if (packageJsonRawParsedResult.success === false) {
  throw new Error('package.json is broken')
}

const packageDependencyList = Object.keys(
  packageJsonRawParsedResult.data.dependencies,
)

console.info('\n🗣️  Compiling dependencies into separate chunk...')

// Export all dependencies via temporary entry file to let esbuild create a shared chunk for all deps
// Using export ensures esbuild doesn't tree-shake them away
const reExportFileContent = packageDependencyList
  .map((dep, index) => `export * as dep${index} from '${dep}';`)
  .join('\n')

fs.writeFileSync(dependenciesEntryPath, reExportFileContent)

await esbuild.build({
  entryPoints: [
    indexTsPath,
    dependenciesEntryPath, // Forces deps into shared chunk
  ],
  bundle: true,
  nodePaths: [nodeModulesDirPath],
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
