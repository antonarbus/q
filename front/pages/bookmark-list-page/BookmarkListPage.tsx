import { useNavItemsOnBookmarksPageOpen } from '@front/features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@front/shared/layout/GridPageLayout'
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
