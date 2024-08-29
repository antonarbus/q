import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openQuotationInfoModal = (): void => {
  const navigateState: NavigateState = {
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  }

  void router.navigate(`./${route.info}`, {
    state: navigateState,
  })
}
