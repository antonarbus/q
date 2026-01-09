import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch, getState } from '@shared/lib/redux'

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
