import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsPageOpen } from '@features/open_close/open_quotations_page'
import { QuotationsGrid } from './QuotationsGrid'
import { GridPageLayout } from '@shared/layouts/GridPageLayout'

export const QuotationsPage = (): JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <GridPageLayout>
      <QuotationsGrid />
      <Outlet />
    </GridPageLayout>
  )
}
