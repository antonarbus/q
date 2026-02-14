import { useNavItemsOnBookmarksPageOpen } from '@feature/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import { Outlet } from 'react-router-dom'
import { BookmarkListAllGrid } from './BookmarkListAllGrid'

export const BookmarkListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarkListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
