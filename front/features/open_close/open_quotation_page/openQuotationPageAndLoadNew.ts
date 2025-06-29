import { router } from '@shared/lib/react-router-dom'
import { route } from '@shared/const/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openQuotationPageAndLoadNew = (): void => {
  dispatch(
    appSlice.actions.setShouldLoadQuotation({
      yesOrNo: 'yes',
      from: 'template',
    }),
  )

  void router.navigate(`/${route.new}`)
}
