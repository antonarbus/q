import { lazy } from 'react'

export const BookmarkListPageLazy = lazy(async () => {
  const module = await import('./BookmarkListPage')
  return { default: module.BookmarkListPage }
})
