import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { instance } from '@front/shared/instance'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

export const deleteQuotationListCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
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
