import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsOpen } from '@features/items/open/open_quotations_page'
import { QuotationsAgGrid } from './QuotationsAgGrid'
import { QuotationsLayout } from './QuotationsLayout'

export const QuotationsTable = (): JSX.Element => {
  useNavItemsOnQuotationsOpen()

  return (
    <QuotationsLayout>
      <QuotationsAgGrid />
      <Outlet />
    </QuotationsLayout>
  )
}
