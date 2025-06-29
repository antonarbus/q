import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsPageOpen } from '@features/open_close/open_quotations_page'
import { QuotationListGrid } from './QuotationListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const QuotationListPage = (): React.JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <GridPageLayout>
      <QuotationListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
