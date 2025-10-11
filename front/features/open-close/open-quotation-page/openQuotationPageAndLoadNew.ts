import { appSlice } from '@shared/appSlice'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'
import { dispatch } from '@shared/lib/redux'

export const openQuotationPageAndLoadNew = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'template',
    }),
  )

  void router.navigate(`/${route.new}`)
}
