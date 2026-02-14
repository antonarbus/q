import { useNavItemsOnBookmarksPageOpen } from '@feature/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import { Outlet } from 'react-router-dom'
import { BookmarkListGrid } from './BookmarkListGrid'

export const BookmarkListPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
