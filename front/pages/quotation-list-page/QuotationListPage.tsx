import { Outlet } from 'react-router-dom'
import { useNavItemsOnQuotationsPageOpen } from '@features/open-close/open-quotations-page'
import { QuotationListGrid } from './QuotationListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'

export const QuotationListPage = (): JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <GridPageLayout>
      <QuotationListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
