import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'

export const openAdminPage = (): void => {
  void router.navigate(`/${route.userList}`)
}
