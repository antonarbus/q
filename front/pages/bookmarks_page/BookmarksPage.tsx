import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open_close/open_bookmarks_page'
import { BookmarksGrid } from './BookmarksGrid'
import { GridPageLayout } from '@shared/layouts/GridPageLayout'

export const BookmarksPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <BookmarksGrid />
      <Outlet />
    </GridPageLayout>
  )
}
