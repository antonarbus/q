import type { ResBody } from '@back/api/quotation/getQuotationsHandler'
import { produce } from 'immer'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'

export const deleteQuotationsCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotations] },
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
