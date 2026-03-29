import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { reduxHolder } from '@front/shared/lib/redux'

type Props = {
  prefilledEmail: string
}

export const openRegisterModal = (props: Props): void => {
  reduxHolder.dispatch(appSlice.actions.setNavigateState({ shouldSlide: true }))

  routerHolder.router.navigate(`../${route.register}`, {
    state: { prefilledEmail: props.prefilledEmail },
  })
}
