import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { previousQuotationRef } from '@entities/quotation'
import { navSlice } from '@shared/nav'

export const openPreviousQuotation = (): void => {
  dispatch(navSlice.actions.hideNavItems({ navItemIdKeys: ['back'] }))
  void router.navigate(`/${previousQuotationRef.current?.id ?? 'new'}`)
}
