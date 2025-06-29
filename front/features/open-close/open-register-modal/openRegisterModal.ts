import { router } from '@shared/lib/react-router-dom'
import { route } from '@shared/const/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openRegisterModal = (): void => {
  dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))
  void router.navigate(`../${route.register}`)
}
