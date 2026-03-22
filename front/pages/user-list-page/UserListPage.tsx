import { GridPageLayout } from '@front/shared/layout/GridPageLayout'
import { UserListGrid } from './UserListGrid'

export const UserListPage = (): React.JSX.Element => {
  return (
    <GridPageLayout>
      <UserListGrid />
    </GridPageLayout>
  )
}
