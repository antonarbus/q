import { dispatch, getState } from '@lib_instances/store'
import { quotationSignal, saveQuotationFn, updateOrAppendIntoQuotationsCache } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  if (quotationSignal.value.id === 'template version') {
    quotationSignal.value = { ...quotationSignal.value, id: nanoid(5) }
  }

  try {
    const { document } = await saveQuotationFn({
      quotation: quotationSignal.value,
      items: getState().items,
      id: quotationSignal.value.id,
    })

    quotationSignal.value = { ...quotationSignal.value, ...document }
    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
    updateOrAppendIntoQuotationsCache({ quotation: quotationSignal.value })
    window.history.replaceState('', '', `/${quotationSignal.value.id}`)
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
