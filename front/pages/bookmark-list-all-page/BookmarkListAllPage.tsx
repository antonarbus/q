import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { BookmarkListAllGrid } from './BookmarkListAllGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'

export const BookmarkListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
