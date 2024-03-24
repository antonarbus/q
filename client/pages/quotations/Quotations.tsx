import { Outlet } from 'react-router-dom'
import { useDisableNavItemsOnQuotationsOpen } from '@features/quotation/open_quotations'
import { QuotationsLayout } from './QuotationsLayout'
import { QuotationsTable } from './QuotationsTable'

export const Quotations = (): JSX.Element => {
  useDisableNavItemsOnQuotationsOpen()

  return (
    <QuotationsLayout>
      <QuotationsTable />
      <Outlet />
    </QuotationsLayout>
  )
}
