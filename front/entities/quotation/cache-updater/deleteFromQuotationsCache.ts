import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { produce } from 'immer'
import { queryKey } from '@shared/const/queryKey'
import { instance } from '@shared/instance'

type Props = {
  id: string
}

export const deleteFromQuotationsCache = ({ id }: Props): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotations] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotations === undefined) {
          return
        }

        const { quotations } = draft
        const index = quotations.findIndex((quotation) => quotation.id === id)
        const foundInCache = index !== -1

        if (foundInCache === true) {
          quotations.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
