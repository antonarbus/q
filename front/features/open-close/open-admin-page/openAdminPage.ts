import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'

export const openAdminPage = (): void => {
  void router.navigate(`/${route.userList}`)
}
