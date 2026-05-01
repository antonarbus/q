import { lazy } from 'react'

export const FileListAllPageLazy = lazy(async () => {
  const module = await import('./FileListAllPage')
  return { default: module.FileListAllPage }
})
