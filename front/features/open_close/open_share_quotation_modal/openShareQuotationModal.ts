import { router } from '@shared/lib/router'
import { dispatch, getState } from '@shared/lib/redux'
import { route } from '@shared/consts/route'
import { appSlice } from '@shared/appSlice'

export const openShareQuotationModal = (): void => {
  if (getState().user.email === null) {
    dispatch(
      appSlice.actions.setNavigateState({
        to: `/${route.share}`,
        shouldSlide: true,
      }),
    )

    void router.navigate(`./${route.login}`)

    return
  }

  void router.navigate(`./${route.share}`)
}
