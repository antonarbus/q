import esbuild from 'esbuild'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
console.log('🚀 ~ dirname:', dirname)
const rootDir = path.resolve(dirname, '..')

// Helper to resolve file with possible extensions
const resolveWithExtensions = (basePath: string): string | null => {
  const extensions = ['.ts', '.tsx', '.js', '.jsx']

  // Try exact path first
  if (existsSync(basePath)) {
    const stats = statSync(basePath)
    if (stats.isFile()) return basePath

    // If directory, try index files
    for (const ext of extensions) {
      const indexPath = path.join(basePath, `index${ext}`)
      if (existsSync(indexPath)) return indexPath
    }
  }

  // Try with extensions
  for (const ext of extensions) {
    const withExt = `${basePath}${ext}`
    if (existsSync(withExt)) return withExt
  }

  return null
}

// Plugin to resolve path aliases (@root/*, @back/*) from tsconfig.json
const pathAliasPlugin: esbuild.Plugin = {
  name: 'path-alias',
  setup(build) {
    build.onResolve({ filter: /^@root\// }, (args) => {
      const newPath = args.path.replace(/^@root\//, '')
      const resolved = resolveWithExtensions(path.resolve(rootDir, newPath))
      if (resolved) return { path: resolved }

      return null
    })

    build.onResolve({ filter: /^@back\// }, (args) => {
      const newPath = args.path.replace(/^@back\//, '')

      const resolved = resolveWithExtensions(
        path.resolve(rootDir, 'back', newPath),
      )

      if (resolved) return { path: resolved }

      return null
    })
  },
}

console.info('Bundling backend...')

try {
  const result = await esbuild.build({
    entryPoints: [path.resolve(rootDir, 'back/index.ts')],
    bundle: true,
    platform: 'node',
    target: 'node20', // Match Bun's Node.js compatibility
    format: 'esm',
    outfile: path.resolve(rootDir, 'back/build/index.js'),
    sourcemap: false,
    minify: false,
    treeShaking: true,
    loader: {
      '.html': 'text', // Use esbuild's built-in text loader for HTML files
    },
    plugins: [pathAliasPlugin],
    // Bundle everything (no externals)
    logLevel: 'info',
    metafile: true, // Generate build metadata
  })

  console.info(`📦 Output: back/build/index.js`)

  // Analyze bundle size
  console.info('\n📊 Top 20 largest dependencies:')
  const outputs = result.metafile.outputs['back/build/index.js']

  if (outputs?.inputs !== undefined) {
    const sizes = Object.entries(outputs.inputs)
      .map(([file, info]) => ({
        file: file.replace(`${rootDir}/`, ''),
        bytes: info.bytesInOutput,
      }))
      .sort((fileA, fileB) => fileB.bytes - fileA.bytes)
      .slice(0, 20)

    sizes.forEach(({ file, bytes }) => {
      const mb = (bytes / 1024 / 1024).toFixed(2)
      const kb = (bytes / 1024).toFixed(0)
      const size = bytes > 1024 * 100 ? `${mb}MB` : `${kb}KB`

      console.info(`  ${size.padStart(8)} - ${file}`)
    })
  }
} catch (error) {
  console.error('❌ Backend build failed:', error)
  process.exit(1)
}
