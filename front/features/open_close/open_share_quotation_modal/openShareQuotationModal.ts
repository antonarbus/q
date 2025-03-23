import { router } from '@shared/lib/router'
import { getState } from '@shared/lib/redux'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openShareQuotationModal = (): void => {
  const navigateState: NavigateState = {
    navigatedFrom: `/`,
    navigateTo: `/${route.share}`,
  }

  if (!getState().user.email) {
    void router.navigate(`./${route.login}`, {
      state: navigateState,
    })

    return
  }

  void router.navigate(`./${route.share}`, {
    state: navigateState,
  })
}
