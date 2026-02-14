import { useNavItemsOnBookmarksPageOpen } from '@feature/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import { Outlet } from 'react-router-dom'
import { QuotationListAllGrid } from './QuotationListAllGrid'

export const QuotationListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <QuotationListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
