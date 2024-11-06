import { instance } from '@shared/instance'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openRegisterModal = (): void => {
  const navigateState: NavigateState = {
    shouldSlide: true,
  }

  void instance.router.navigate(`../${route.register}`, {
    state: navigateState,
  })
}
