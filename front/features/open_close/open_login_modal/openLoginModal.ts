import { instance } from '@shared/instance'
import { route } from '@shared/consts/route'

export const openLoginModal = (): void => {
  void instance.router.navigate(`./${route.login}`)
}
