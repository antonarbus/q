import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { QuotationListAllGrid } from './QuotationListAllGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const QuotationListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <QuotationListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
