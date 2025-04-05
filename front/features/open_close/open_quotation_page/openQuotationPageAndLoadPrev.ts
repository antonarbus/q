import { router } from '@shared/lib/router'
import { backToQuotationRef } from '@entities/quotation'
import { dispatch } from '@shared/lib/redux'
import { appSlice } from '@shared/appSlice'

export const openQuotationPageAndLoadPrev = (): void => {
  dispatch(appSlice.actions.setQuotationSource({ quotationSource: 'previous' }))
  void router.navigate(`/${backToQuotationRef.current?.id ?? 'new'}`)
}
