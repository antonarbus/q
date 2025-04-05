import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openQuotationPageAndLoadNew = (): void => {
  dispatch(appSlice.actions.reRenderQuotation())
  dispatch(appSlice.actions.setQuotationSource({ quotationSource: 'template' }))
  void router.navigate(`/${route.new}`)
}
