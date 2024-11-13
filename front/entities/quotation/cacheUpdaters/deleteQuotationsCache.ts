import type { ResBody } from '@back/api/quotation/getQuotationsRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

export const deleteQuotationsCache = (): void => {
  instance.reactQuery.setQueriesData<ResBody>(
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
