import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'
import { produce } from 'immer'

export const deleteQuotationListCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotationList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotations === undefined) {
          return
        }

        draft.quotations = []
      })

      return updatedCacheData
    },
  )
}
