import { lazy } from 'react'

export const VisitorListPageLazy = lazy(async () => {
  const module = await import('./VisitorListPage')
  return { default: module.VisitorListPage }
})
