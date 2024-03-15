import { reactQuery } from '@lib_instances/reactQuery'
import { dispatch, getState } from '@lib_instances/store'
import { type ResBody as ResBodyQuotations } from '@server/api/getQuotationsRouter'
import { produce } from 'immer'
import { quotationSignal, saveQuotationFn, saveQuotationLocally } from '@entities/quotation'
import { queryKey } from '@shared/consts/queryKey'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'

// todo: ones we saved re-direct to id route
// todo: rename Quotation --> Reset to default offer to NEW

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  if (quotationSignal.value.id === 'local version') {
    quotationSignal.value = { ...quotationSignal.value, id: nanoid(5) }
  }

  try {
    const { document } = await saveQuotationFn({
      quotation: quotationSignal.value,
      items: getState().items,
      id: quotationSignal.value.id,
    })

    quotationSignal.value = {
      ...quotationSignal.value,
      ...document,
    }

    saveQuotationLocally()
    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))

    reactQuery.setQueriesData<ResBodyQuotations>(
      { queryKey: [queryKey.getQuotations] },
      (cacheData) => {
        const updatedCacheData = produce(cacheData, (draft) => {
          if (draft?.documents === undefined) return
          const quotations = draft.documents
          const index = quotations.findIndex(quotation => quotation.id === quotationSignal.value.id)
          const foundInCache = index !== -1
          if (foundInCache) {
            quotations.splice(index, 1, quotationSignal.value)
          }
        })
        return updatedCacheData
      })
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
