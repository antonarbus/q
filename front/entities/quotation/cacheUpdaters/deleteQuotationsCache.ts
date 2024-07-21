import type { ResBody } from '@back/api/quotation/getQuotationsRouter'
import { reactQuery } from '@lib_instances/reactQuery'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

export const deleteQuotationsCache = (): void => {
  reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotations] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotations === undefined) return
        draft.quotations = []
      })

      return updatedCacheData
    },
  )
}
