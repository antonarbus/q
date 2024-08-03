import { router } from '@lib_instances/router_'
import { route } from '@shared/consts/route'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
