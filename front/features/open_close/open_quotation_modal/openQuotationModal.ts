import { router } from '@lib_instances/router'
import { getState } from '@lib_instances/store'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openQuotationModal = (): void => {
  const navigateState: NavigateState = {
    navigatedFrom: `/`,
    navigateTo: `/${route.save}`,
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  }

  if (!getState().user.email) {
    void router.navigate(`./${route.login}`, {
      state: navigateState,
    })

    return
  }

  void router.navigate(`./${route.save}`, {
    state: navigateState,
  })
}
