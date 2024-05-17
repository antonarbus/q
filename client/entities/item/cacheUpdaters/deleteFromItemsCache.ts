import { reactQuery } from '@lib_instances/reactQuery'
import { type ResBody } from '@server/api/getItemsRouter'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'

type Props = {
  id: string
}

export const deleteFromItemsCache = ({ id }: Props): void => {
  reactQuery.setQueriesData<ResBody>({ queryKey: [queryKey.getBookmarks] }, (cacheData) => {
    const updatedCacheData = produce(cacheData, (draft) => {
      if (draft?.documents === undefined) return

      const items = draft.documents
      const index = items.findIndex(item => item.id === id)
      const foundInCache = index !== -1

      if (foundInCache) {
        items.splice(index, 1)
      }
    })

    return updatedCacheData
  })
}
