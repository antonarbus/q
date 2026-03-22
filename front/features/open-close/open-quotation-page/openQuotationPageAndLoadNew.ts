import { appSlice } from '@front/shared/appSlice'
import { route } from '@front/shared/lib/react-router-dom/route'
import { router } from '@front/shared/lib/react-router-dom/router'
import { dispatch } from '@front/shared/lib/redux'

export const openQuotationPageAndLoadNew = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'template',
    }),
  )

  void router.navigate(`/${route.new}`)
}
