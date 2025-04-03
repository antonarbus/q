import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'
import type { QuotationLocationState } from '.'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openQuotationPageAndLoadNew = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'new',
  }

  dispatch(appSlice.actions.reRenderQuotation())

  void router.navigate(`/${route.new}`, { state })
}
