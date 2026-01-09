import { route } from '@back/api/route'
import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import { axiosWithAuth } from '@shared/lib/axios'
import type { IDatasource } from 'ag-grid-community'
import type { AxiosResponse } from 'axios'
import { useMemo, useState } from 'react'
import { useFirstMountState } from 'react-use'

type Res = {
  datasource: IDatasource
  isLoading: boolean
  isFetching: boolean
  isFetched: boolean
}

export const useQuotationListAll = (): Res => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const isFirstMount = useFirstMountState()

  const datasource = useMemo(() => {
    const ds: IDatasource = {
      rowCount: undefined,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      getRows: async (params) => {
        try {
          if (isFirstMount === true) {
            setIsLoading(true)
            setIsFetching(true)
          }

          if (isFirstMount === false) {
            setIsFetching(true)
          }

          const response = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>(
            {
              url: route.getQuotationListAll.url,
              method: route.getQuotationListAll.method,
              data: {
                startRow: params.startRow,
                endRow: params.endRow,
                sortModel: params.sortModel,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                filterModel: params.filterModel,
              },
            },
          )

          const getLastRow = (): number => {
            const quotationListCount = response.data.quotationList.length

            const didReachEndOfTheList =
              quotationListCount >= params.endRow - params.startRow

            if (didReachEndOfTheList === false) {
              const lastRow = params.startRow + quotationListCount

              return lastRow
            }

            // reached the end of the list
            const lastRow = response.data.quotationListTotalCount

            return lastRow
          }

          const lastRow = getLastRow()
          params.successCallback(response.data.quotationList, lastRow)
        } catch {
          params.failCallback()
        } finally {
          setIsLoading(false)
          setIsFetching(false)
          setIsFetched(true)
        }
      },
    }

    return ds
  }, [])

  return { datasource, isLoading, isFetching, isFetched }
}
