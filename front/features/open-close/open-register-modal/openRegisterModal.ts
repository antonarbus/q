import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { router } from '@front/shared/lib/react-router-dom/router'
import { dispatch } from '@front/shared/lib/redux'

type Props = {
  prefilledEmail: string
}

export const openRegisterModal = (props: Props): void => {
  dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))

  void router.navigate(`../${route.register}`, {
    state: { prefilledEmail: props.prefilledEmail },
  })
}
