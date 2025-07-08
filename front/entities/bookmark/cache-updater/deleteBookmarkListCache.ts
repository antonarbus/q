import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { produce } from 'immer'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'

export const deleteBookmarkListCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarkList] },
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
