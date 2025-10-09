import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { BookmarkListGrid } from './BookmarkListGrid'

export const BookmarkListPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
