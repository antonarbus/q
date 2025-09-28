import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { QuotationListAllGrid } from './QuotationListAllGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'

export const QuotationListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <QuotationListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
