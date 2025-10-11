import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/lib/tanstack/react-query/queryKey'
import { produce } from 'immer'

type Props = {
  id: string
}

export const deleteFromQuotationListCache = ({ id }: Props): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotationList] },
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
