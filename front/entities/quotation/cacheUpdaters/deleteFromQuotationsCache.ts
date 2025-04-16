import type { ResBody } from '@back/api/quotation/getQuotations'
import { produce } from 'immer'
import { queryKey } from '@shared/consts/queryKey'
import { instance } from '@shared/instance'

type Props = {
  id: string
}

export const deleteFromQuotationsCache = ({ id }: Props): void => {
  instance.reactQuery.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotations] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotations === undefined) {
          return
        }

        const quotations = draft.quotations
        const index = quotations.findIndex((quotation) => quotation.id === id)
        const foundInCache = index !== -1

        if (foundInCache) {
          quotations.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
