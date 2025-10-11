import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch } from '@shared/lib/redux'

export const openRegisterModal = (): void => {
  dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))
  void router.navigate(`../${route.register}`)
}
