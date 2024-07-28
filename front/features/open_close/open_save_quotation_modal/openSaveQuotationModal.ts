import { router } from '@lib_instances/router'
import { getState } from '@lib_instances/store'
import { route } from '@shared/consts/route'

export type OpenSaveQuotationModalNavigateState = {
  navigatedFrom: string
  navigateTo: string
  scrollTop: number
}

export const openSaveQuotationModal = (): void => {
  const navigateState: OpenSaveQuotationModalNavigateState = {
    navigatedFrom: `/`,
    navigateTo: `/${route.saveQuotation}`,
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  }

  if (!getState().user.email) {
    void router.navigate(`./${route.login}`, {
      state: navigateState,
    })

    return
  }

  void router.navigate(`./${route.saveQuotation}`, {
    state: navigateState,
  })
}
