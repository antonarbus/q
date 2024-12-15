import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'
import type { QuotationLocationState } from '.'
import { dispatch } from '@shared/lib/redux'
import { quotationKeySlice } from '@entities/quotation'

export const openQuotationPageAndLoadNew = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'new',
  }

  dispatch(quotationKeySlice.actions.reload())

  void router.navigate(`/${route.new}`, {
    state,
  })
}
