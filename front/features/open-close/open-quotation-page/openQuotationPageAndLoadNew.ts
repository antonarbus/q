import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { reduxHolder } from '@front/shared/lib/redux'

export const openQuotationPageAndLoadNew = (): void => {
  reduxHolder.dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'template',
    }),
  )

  void routerHolder.router.navigate(`/${route.new}`)
}
