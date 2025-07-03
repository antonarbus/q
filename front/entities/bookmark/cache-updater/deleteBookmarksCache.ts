import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { produce } from 'immer'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'

export const deleteBookmarksCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
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
