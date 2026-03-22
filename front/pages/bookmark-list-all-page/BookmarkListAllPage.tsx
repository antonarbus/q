import { useNavItemsOnBookmarksPageOpen } from '@front/features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@front/shared/layout/GridPageLayout'
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
