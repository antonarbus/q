import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { FileListAllGrid } from './FileListAllGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const FileListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <FileListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
