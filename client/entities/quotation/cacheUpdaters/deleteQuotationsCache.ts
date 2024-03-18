import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody } from '@server/api/getQuotationsRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

export const deleteQuotationsCache = (): void => {
  reactQuery.setQueriesData<ResBody>({ queryKey: [queryKey.getQuotations] }, (cacheData) => {
    const updatedCacheData = produce(cacheData, (draft) => {
      if (draft?.documents === undefined) return
      draft.documents = []
    })

    return updatedCacheData
  })
}
