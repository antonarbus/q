import { router } from '@lib_instances/Router'
import { getState } from '@lib_instances/store'
import { route } from '@shared/consts/route'

export const openSaveQuotationModal = (): void => {
  if (!getState().user.email) {
    void router.navigate(`./${route.login}`, {
      state: {
        navigatedFrom: `/`,
        navigateTo: `/${route.saveQuotation}`,
      },
    })
    return
  }

  void router.navigate(`./${route.saveQuotation}`)
}
