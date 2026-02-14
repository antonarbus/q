import { useNavItemsOnQuotationsPageOpen } from '@feature/open-close/open-quotations-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import { Outlet } from 'react-router-dom'
import { QuotationListGrid } from './QuotationListGrid'

export const QuotationListPage = (): React.JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <GridPageLayout>
      <QuotationListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
