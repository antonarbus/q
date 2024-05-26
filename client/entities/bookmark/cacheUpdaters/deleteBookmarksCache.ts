import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody } from '@server/api/bookmark/getBookmarksRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

export const deleteBookmarksCache = (): void => {
  reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarks] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarks === undefined) return
        draft.bookmarks = []
      })

      return updatedCacheData
    },
  )
}
