import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
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
