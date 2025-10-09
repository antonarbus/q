import { useNavItemsOnBookmarksPageOpen } from '@features/open-close/open-bookmarks-page'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import { FileListAllGrid } from './FileListAllGrid'

export const FileListAllPage = (): JSX.Element => {
  useNavItemsOnBookmarksPageOpen()

  return (
    <GridPageLayout>
      <FileListAllGrid />
      <Outlet />
    </GridPageLayout>
  )
}
