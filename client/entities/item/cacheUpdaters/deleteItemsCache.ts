import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody } from '@server/api/getItemsRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

export const deleteItemsCache = (): void => {
  reactQuery.setQueriesData<ResBody>({ queryKey: [queryKey.getItems] }, (cacheData) => {
    const updatedCacheData = produce(cacheData, (draft) => {
      if (draft?.documents === undefined) return
      draft.documents = []
    })

    return updatedCacheData
  })
}
