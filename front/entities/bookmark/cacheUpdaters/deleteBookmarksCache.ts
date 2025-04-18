import type { ResBody } from '@back/api/bookmark/getBookmarksHandler'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

export const deleteBookmarksCache = (): void => {
  instance.reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarks] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarks === undefined) {
          return
        }

        draft.bookmarks = []
      })

      return updatedCacheData
    },
  )
}
