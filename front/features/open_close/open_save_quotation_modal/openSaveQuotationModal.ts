import { router } from '@shared/lib/router'
import { dispatch, getState } from '@shared/lib/redux'
import { route } from '@shared/consts/route'
import { appSlice } from '@shared/appSlice'

export const openSaveQuotationModal = (): void => {
  dispatch(
    appSlice.actions.setNavigate({
      from: `/`,
      to: `/${route.save}`,
      shouldSlide: false,
    }),
  )

  if (getState().user.email === null) {
    void router.navigate(`./${route.login}`)

    return
  }

  void router.navigate(`./${route.save}`)
}
