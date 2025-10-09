import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'
import { produce } from 'immer'

type Props = {
  id: string
}

export const deleteFromBookmarkListCache = ({ id }: Props): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarkList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarks === undefined) {
          return
        }

        const items = draft.bookmarks
        const index = items.findIndex((item) => item.id === id)
        const foundInCache = index !== -1

        if (foundInCache === true) {
          items.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
