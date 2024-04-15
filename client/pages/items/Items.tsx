import { Outlet } from 'react-router-dom'
import { useNavItemsOnItemsOpen } from '@features/items/open_items'
import { ItemsLayout } from './ItemsLayout'
import { ItemsTable } from './ItemsTable'

export const Items = (): JSX.Element => {
  useNavItemsOnItemsOpen()

  return (
    <ItemsLayout>
      <ItemsTable />
      <Outlet />
    </ItemsLayout>
  )
}
