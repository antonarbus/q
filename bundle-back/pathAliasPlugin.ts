import type esbuild from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const thisPathAbsolute = path.dirname(url.fileURLToPath(import.meta.url))
const rootPathAbsolute = path.resolve(thisPathAbsolute, '..')

// Helper to resolve file with possible extensions
const addExtensionToPath = (basePath: string): string | null => {
  const extensionList = ['.ts', '.tsx', '.js', '.jsx']

  // Try exact path first
  const pathExists = fs.existsSync(basePath)

  if (pathExists === true) {
    const stats = fs.statSync(basePath)
    const isFile = stats.isFile()

    if (isFile === true) {
      return basePath
    }
  }

  // If directory, try index files
  for (const extension of extensionList) {
    const indexPath = path.join(basePath, `index${extension}`)
    const exists = fs.existsSync(indexPath)

    if (exists === true) {
      return indexPath
    }
  }

  // Try with extensions
  for (const ext of extensionList) {
    const withExt = `${basePath}${ext}`
    const exists = fs.existsSync(withExt)

    if (exists === true) {
      return withExt
    }
  }

  return null
}

// Plugin to resolve path aliases (@root/*, @back/*) from tsconfig.json
export const pathAliasPlugin: esbuild.Plugin = {
  name: 'path-alias',
  setup(build) {
    build.onResolve({ filter: /^@root\// }, (args) => {
      const newPath = args.path.replace(/^@root\//u, '')
      const basePath = path.resolve(rootPathAbsolute, newPath)
      const pathWithExtensionAbsolute = addExtensionToPath(basePath)

      if (pathWithExtensionAbsolute === null) {
        return null
      }

      return {
        path: pathWithExtensionAbsolute,
      }
    })

    build.onResolve({ filter: /^@back\// }, (args) => {
      const newPath = args.path.replace(/^@back\//u, '')
      const basePath = path.resolve(rootPathAbsolute, 'back', newPath)
      const pathWithExtensionAbsolute = addExtensionToPath(basePath)

      if (pathWithExtensionAbsolute === null) {
        return null
      }

      return {
        path: pathWithExtensionAbsolute,
      }
    })
  },
}
