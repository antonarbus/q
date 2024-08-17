import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openRegisterModal = (): void => {
  void router.navigate(`../${route.register}`, {
    state: {
      shouldSlide: true,
    } as NavigateState,
  })
}
