import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'

export const openRegisterModal = (): void => {
  void router.navigate(`../${route.register}`)
}
