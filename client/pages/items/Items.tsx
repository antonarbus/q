import { Outlet } from 'react-router-dom'
import { useDisableNavItemsOnQuotationsOpen } from '@features/quotation/open_quotations'
import { ItemsLayout } from './ItemsLayout'
import { ItemsTable } from './ItemsTable'

export const Items = (): JSX.Element => {
  useDisableNavItemsOnQuotationsOpen()

  return (
    <ItemsLayout>
      <ItemsTable />
      <Outlet />
    </ItemsLayout>
  )
}
