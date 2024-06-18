import { reactQuery } from '@lib_instances/reactQuery'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { type ResBody } from '../../../../back/api/bookmark/getBookmarksRouter'
import { type Item } from '../index'

type Props = {
  item: Item
}

export const updateOrAppendIntoBookmarksCache = ({ item }: Props): void => {
  reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarks] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarks === undefined) return

        const items = draft.bookmarks
        const index = items.findIndex(
          (itemInCache) => itemInCache.id === item.id,
        )
        const foundInCache = index !== -1

        if (!foundInCache) {
          items.unshift(item)
        }

        if (foundInCache) {
          items.splice(index, 1, item)
        }
      })
      return updatedCacheData
    },
  )
}
