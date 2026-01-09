import { useNavItemsOnBookmarksPageOpen } from '@feature/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { QuotationListAllGrid } from './QuotationListAllGrid'

export const QuotationListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <QuotationListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
