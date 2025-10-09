import { appSlice } from '@shared/appSlice'
import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'
import { dispatch, getState } from '@shared/lib/redux'

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
