import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
