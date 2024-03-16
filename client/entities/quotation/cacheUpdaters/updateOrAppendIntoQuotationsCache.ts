import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody as ResBodyQuotations } from '@server/api/getQuotationsRouter'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

type Props = {
  quotation: QuotationModelType
}

export const updateOrAppendIntoQuotationsCache = ({ quotation }: Props): void => {
  reactQuery.setQueriesData<ResBodyQuotations>({ queryKey: [queryKey.getQuotations] }, (cacheData) => {
    const updatedCacheData = produce(cacheData, (draft) => {
      if (draft?.documents === undefined) return

      const quotations = draft.documents
      const index = quotations.findIndex(quotationInCache => quotationInCache.id === quotation.id)
      const foundInCache = index !== -1

      if (!foundInCache) {
        quotations.unshift(quotation)
      }

      if (foundInCache) {
        quotations.splice(index, 1, quotation)
      }
    })
    return updatedCacheData
  })
}
