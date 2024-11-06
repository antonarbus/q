import { instance } from '@shared/instance'
import { getState } from '@lib_instances/store'
import { route } from '@shared/consts/route'
import type { NavigateState } from '@shared/types/NavigateState'

export const openQuotationModal = (): void => {
  const navigateState: NavigateState = {
    navigatedFrom: `/`,
    navigateTo: `/${route.save}`,
  }

  if (!getState().user.email) {
    void instance.router.navigate(`./${route.login}`, {
      state: navigateState,
    })

    return
  }

  void instance.router.navigate(`./${route.save}`, {
    state: navigateState,
  })
}
