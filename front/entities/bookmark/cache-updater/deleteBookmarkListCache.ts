import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { produce } from 'immer'

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
