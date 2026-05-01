import { lazy } from 'react'

export const BookmarkListAllPageLazy = lazy(async () => {
  const module = await import('./BookmarkListAllPage')
  return { default: module.BookmarkListAllPage }
})
