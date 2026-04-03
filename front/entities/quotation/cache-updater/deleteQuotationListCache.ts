import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { queryClient } from '@front/shared/lib/tanstack-query/queryClient'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

export const deleteQuotationListCache = (): void => {
  queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotationList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotationList === undefined) {
          return
        }

        draft.quotationList = []
      })

      return updatedCacheData
    },
  )
}
