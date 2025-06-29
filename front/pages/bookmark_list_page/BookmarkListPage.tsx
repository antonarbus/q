import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open_close/open_bookmarks_page'
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
