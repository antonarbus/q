import { router } from '@shared/lib/react-router-dom'
import { dispatch, getState } from '@shared/lib/redux'
import { route } from '@shared/const/route'
import { appSlice } from '@shared/appSlice'

export const openSaveQuotationModal = (): void => {
  if (getState().user.email === null) {
    dispatch(
      appSlice.actions.setNavigateState({
        to: `/${route.save}`,
        shouldSlide: true,
      }),
    )

    void router.navigate(`./${route.login}`)

    return
  }

  void router.navigate(`./${route.save}`)
}
