import { lazy } from 'react'

export const UserListPageLazy = lazy(async () => {
  const module = await import('./UserListPage')
  return { default: module.UserListPage }
})
