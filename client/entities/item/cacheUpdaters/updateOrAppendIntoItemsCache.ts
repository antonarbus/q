import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody } from '@server/api/getItemsRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { type ItemCopyable } from '../index'

type Props = {
  item: ItemCopyable
}

export const updateOrAppendIntoItemsCache = ({ item }: Props): void => {
  reactQuery.setQueriesData<ResBody>({ queryKey: [queryKey.getItems] }, (cacheData) => {
    const updatedCacheData = produce(cacheData, (draft) => {
      if (draft?.documents === undefined) return

      const items = draft.documents
      const index = items.findIndex(itemInCache => itemInCache.id === item.id)
      const foundInCache = index !== -1

      if (!foundInCache) {
        items.unshift(item)
      }

      if (foundInCache) {
        items.splice(index, 1, item)
      }
    })
    return updatedCacheData
  })
}
