import { useNavItemsOnQuotationsPageOpen } from '@features/open-close/open-quotations-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { QuotationListGrid } from './QuotationListGrid'

export const QuotationListPage = (): JSX.Element => {
  useNavItemsOnQuotationsPageOpen()

  return (
    <GridPageLayout>
      <QuotationListGrid />
      <Outlet />
    </GridPageLayout>
  )
}
