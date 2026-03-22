import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { instance } from '@front/shared/instance'
import { queryKey } from '@front/shared/lib/tanstack-query/queryKey'
import { produce } from 'immer'

type Props = {
  id: string
}

export const deleteFromQuotationListCache = (props: Props): void => {
  instance.queryClient.setQueriesData<ResBody>(
    { queryKey: [queryKey.getQuotationList] },
    (cacheData) => {
      const updatedCacheData = produce(cacheData, (draft) => {
        if (draft?.quotationList === undefined) {
          return
        }

        const index = draft.quotationList.findIndex(
          (quotation) => quotation.id === props.id,
        )

        const foundInCache = index !== -1

        if (foundInCache === true) {
          draft.quotationList.splice(index, 1)
        }
      })

      return updatedCacheData
    },
  )
}
