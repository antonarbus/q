import { type ResBody as ResBodyQuotations } from '@back/api/quotation/getQuotationsRouter'
import { reactQuery } from '@lib_instances/reactQuery'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { type Quotation } from '../types'

type Props = {
  quotation: Quotation
}

export const updateOrAppendIntoQuotationsCache = ({
  quotation,
}: Props): void => {
  reactQuery.setQueriesData<ResBodyQuotations>(
    { queryKey: [queryKey.getQuotations] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotations === undefined) return

        const quotations = draft.quotations
        const index = quotations.findIndex(
          (quotationInCache) => quotationInCache.id === quotation.id,
        )
        const foundInCache = index !== -1

        if (!foundInCache) {
          quotations.unshift(quotation)
        }

        if (foundInCache) {
          quotations.splice(index, 1, quotation)
        }
      })
      return updatedCacheData
    },
  )
}
