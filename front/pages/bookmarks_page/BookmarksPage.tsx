import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open_close/open_bookmarks_page'
import { BookmarksGrid } from './BookmarksGrid'
import { BookmarksPageLayout } from './layouts/BookmarksPageLayout'

export const BookmarksPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <BookmarksPageLayout>
      <BookmarksGrid />
      <Outlet />
    </BookmarksPageLayout>
  )
}
