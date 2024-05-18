import { Outlet } from 'react-router-dom'
import { useNavItemsOnItemsOpen } from '@features/open_close/open_bookmarks_page'
import { BookmarksAgGrid } from './BookmarksAgGrid'
import { BookmarksTableLayout } from './BookmarksTableLayout'

export const BookmarksTable = (): JSX.Element => {
  useNavItemsOnItemsOpen()

  return (
    <BookmarksTableLayout>
      <BookmarksAgGrid />
      <Outlet />
    </BookmarksTableLayout>
  )
}
