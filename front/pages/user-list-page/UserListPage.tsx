import { UserListGrid } from './UserListGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const UserListPage = (): React.JSX.Element => {
  return (
    <GridPageLayout>
      <UserListGrid />
    </GridPageLayout>
  )
}
