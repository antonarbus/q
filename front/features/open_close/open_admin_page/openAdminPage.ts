import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'

export const openAdminPage = (): void => {
  void router.navigate(`/${route.admin}`)
}
