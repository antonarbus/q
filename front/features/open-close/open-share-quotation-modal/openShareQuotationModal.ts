import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { router } from '@front/shared/lib/react-router-dom/router'
import { dispatch, getState } from '@front/shared/lib/redux'

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
