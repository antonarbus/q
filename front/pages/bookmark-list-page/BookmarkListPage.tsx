import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { BookmarkListGrid } from './BookmarkListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const BookmarkListPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
