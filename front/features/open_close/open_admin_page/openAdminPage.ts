import { instance } from '@shared/instance'
import { route } from '@shared/consts/route'

export const openAdminPage = (): void => {
  void instance.router.navigate(`/${route.admin}`)
}
