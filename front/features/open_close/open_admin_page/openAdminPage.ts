import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'

export const openAdminPage = (): void => {
  void router.navigate(`/${route.users}`)
}
