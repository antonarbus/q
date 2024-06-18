import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
