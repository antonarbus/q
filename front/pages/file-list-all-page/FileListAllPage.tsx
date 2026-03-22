import { useNavItemsOnBookmarksPageOpen } from '@front/features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@front/shared/layout/GridPageLayout'
import { Outlet } from 'react-router-dom'
import { FileListAllGrid } from './FileListAllGrid'

export const FileListAllPage = (): React.JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <FileListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
