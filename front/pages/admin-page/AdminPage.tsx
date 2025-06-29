import { UsersGrid } from './UsersGrid'
import { GridPageLayout } from '@shared/layout/GridPageLayout'

export const AdminPage = (): React.JSX.Element => {
  return (
    <GridPageLayout>
      <UsersGrid />
    </GridPageLayout>
  )
}
