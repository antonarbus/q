import { Outlet } from 'react-router-dom'
import { useDisableNavItemsOnItemsOpen } from '@features/items/open_items'
import { ItemsLayout } from './ItemsLayout'
import { ItemsTable } from './ItemsTable'

export const Items = (): JSX.Element => {
  useDisableNavItemsOnItemsOpen()

  return (
    <ItemsLayout>
      <ItemsTable />
      <Outlet />
    </ItemsLayout>
  )
}
