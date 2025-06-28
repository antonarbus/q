import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openRegisterModal = (): void => {
  dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))
  void router.navigate(`../${route.register}`)
}
