import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsOpen } from '@features/quotation/open_quotations'
import { QuotationsLayout } from './QuotationsLayout'
import { QuotationsTable } from './QuotationsTable'

export const Quotations = (): JSX.Element => {
  useNavItemsOnQuotationsOpen()

  return (
    <QuotationsLayout>
      <QuotationsTable />
      <Outlet />
    </QuotationsLayout>
  )
}
