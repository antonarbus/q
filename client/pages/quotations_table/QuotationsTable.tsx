import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsOpen } from '@features/quotation/open_quotations'
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
