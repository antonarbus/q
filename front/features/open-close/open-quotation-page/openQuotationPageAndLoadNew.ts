import { appSlice } from '@shared/appSlice'
import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'
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
