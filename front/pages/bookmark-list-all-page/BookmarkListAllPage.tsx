import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { BookmarkListAllGrid } from './BookmarkListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const BookmarkListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
