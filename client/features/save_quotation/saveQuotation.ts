import { reactQuery } from '@lib_instances/reactQuery'
import { getState } from '@lib_instances/store'
import { type ResBody as ResBodyQuotations } from '@server/api/getQuotationsRouter'
import { type AxiosResponse } from 'axios'
import { produce } from 'immer'
import { type ResBody, type ReqBody } from 'server/api/saveQuotationRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { queryKey } from '@shared/consts/queryKey'
import { markAsSaved } from '@shared/isSaved'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'
import { nanoid } from '@shared/lib/nanoid'

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  if (quotationSignal.value.id === 'local version') {
    quotationSignal.value = { ...quotationSignal.value, id: nanoid(5) }
  }

  try {
    const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, ReqBody>({
      method: 'POST',
      url: apiUrl.saveQuotation,
      data: {
        quotation: quotationSignal.value,
        items: getState().items,
        id: quotationSignal.value.id,
      },
    })

    quotationSignal.value = {
      ...quotationSignal.value,
      ...res.data.document,
    }

    saveQuotationLocally()
    markAsSaved()

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

    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
