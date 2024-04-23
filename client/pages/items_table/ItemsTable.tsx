import { Outlet } from 'react-router-dom'
import { useNavItemsOnItemsOpen } from '@features/items/open_items'
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
