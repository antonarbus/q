import { UserListGrid } from './UserListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'
import type { JSX } from 'react'

export const UserListPage = (): JSX.Element => {
  return (
    <GridPageLayout>
      <UserListGrid />
    </GridPageLayout>
  )
}
