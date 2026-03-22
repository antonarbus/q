import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { instance } from '@front/shared/instance'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

type Props = {
  id: string
}

export const deleteFromBookmarkListCache = (props: Props): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarkList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarkList === undefined) {
          return
        }

        const items = draft.bookmarkList
        const index = items.findIndex((item) => item.id === props.id)
        const foundInCache = index !== -1

        if (foundInCache === true) {
          items.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
