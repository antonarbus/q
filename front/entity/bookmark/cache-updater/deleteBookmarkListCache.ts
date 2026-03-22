import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

export const deleteBookmarkListCache = (): void => {
  instance.queryClient.setQueriesData<ResBody>(
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
