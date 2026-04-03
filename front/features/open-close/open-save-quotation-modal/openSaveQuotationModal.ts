import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { reduxHolder } from '@front/shared/lib/redux'

export const openSaveQuotationModal = (): void => {
  if (reduxHolder.getState().user.email === null) {
    reduxHolder.dispatch(
      appSlice.actions.setNavigateState({
        to: `/${route.save}`,
        shouldSlide: true,
      }),
    )

    routerHolder.router.navigate(`./${route.login}`)

    return
  }

  routerHolder.router.navigate(`./${route.save}`)
}
