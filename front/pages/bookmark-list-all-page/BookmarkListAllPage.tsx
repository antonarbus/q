import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { BookmarkListAllGrid } from './BookmarkListAllGrid'

export const BookmarkListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
