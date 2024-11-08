import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
