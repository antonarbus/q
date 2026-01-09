import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'
import { UserListGrid } from './UserListGrid'

export const UserListPage = (): JSX.Element => {
  return (
    <GridPageLayout>
      <UserListGrid />
    </GridPageLayout>
  )
}
