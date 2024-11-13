import type { ResBody } from '@back/api/bookmark/getBookmarksRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

type Props = {
  id: string
}

export const deleteFromBookmarksCache = ({ id }: Props): void => {
  instance.reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getBookmarks] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.bookmarks === undefined) {
          return
        }

        const items = draft.bookmarks
        const index = items.findIndex((item) => item.id === id)
        const foundInCache = index !== -1

        if (foundInCache) {
          items.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
