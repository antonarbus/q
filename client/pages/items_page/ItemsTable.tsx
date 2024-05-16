import { Outlet } from 'react-router-dom'
import { useNavItemsOnItemsOpen } from '@features/open_close/open_bookmarks_page'
import { ItemsAgGrid } from './ItemsAgGrid'
import { ItemsLayout } from './ItemsLayout'

export const ItemsTable = (): JSX.Element => {
  useNavItemsOnItemsOpen()

  return (
    <ItemsLayout>
      <ItemsAgGrid />
      <Outlet />
    </ItemsLayout>
  )
}
