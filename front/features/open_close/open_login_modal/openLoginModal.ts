import { router } from '@shared/lib/react-router-dom'
import { route } from '@shared/const/route'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
