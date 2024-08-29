import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openRegisterModal = (): void => {
  const navigateState: NavigateState = {
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
    shouldSlide: true,
  }

  void router.navigate(`../${route.register}`, {
    state: navigateState,
  })
}
