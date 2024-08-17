import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsPageOpen } from '@features/open_close/open_quotations_page'
import { QuotationsPageLayout } from './layouts/QuotationsPageLayout'
import { QuotationsGrid } from './QuotationsGrid'

export const QuotationsPage = (): JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <QuotationsPageLayout>
      <QuotationsGrid />
      <Outlet />
    </QuotationsPageLayout>
  )
}
