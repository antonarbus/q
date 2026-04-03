import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { queryClient } from '@front/shared/lib/tanstack-query/queryClient'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

export const deleteBookmarkListCache = (): void => {
  queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarkList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarkList === undefined) {
          return
        }

        draft.bookmarkList = []
      })

      return updatedCacheData
    },
  )
}
