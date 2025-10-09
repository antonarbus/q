import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'

export const openLoginModal = (): void => {
  void router.navigate(`./${route.login}`)
}
