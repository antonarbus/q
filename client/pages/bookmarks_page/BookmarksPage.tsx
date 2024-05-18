import { Outlet } from 'react-router-dom'
import { useNavItemsOnItemsOpen } from '@features/open_close/open_bookmarks_page'
import { BookmarksAgGrid } from './BookmarksAgGrid'
import { BookmarksPageLayout } from './layouts/BookmarksPageLayout'

export const BookmarksPage = (): JSX.Element => {
  useNavItemsOnItemsOpen()

  return (
    <BookmarksPageLayout>
      <BookmarksAgGrid />
      <Outlet />
    </BookmarksPageLayout>
  )
}
