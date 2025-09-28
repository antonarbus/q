import { Outlet } from 'react-router-dom'
import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { FileListAllGrid } from './FileListAllGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'

export const FileListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <FileListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
