import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsPageOpen } from '@features/open_close/open_quotations_page'
import { QuotationsPageLayout } from './layouts/QuotationsPageLayout'
import { QuotationsAgGrid } from './QuotationsAgGrid'

export const QuotationsPage = (): JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <QuotationsPageLayout>
      <QuotationsAgGrid />
      <Outlet />
    </QuotationsPageLayout>
  )
}
