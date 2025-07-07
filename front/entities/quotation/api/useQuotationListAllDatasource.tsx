/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { axiosWithAuth } from '@shared/lib/axios'
import { api } from '@back/api'
import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import type { AxiosResponse } from 'axios'
import type { IDatasource } from 'ag-grid-community'
import { useFirstMountState } from 'react-use'
import { useMemo, useState } from 'react'

type Res = {
  datasource: IDatasource
  isLoading: boolean
  isFetching: boolean
  isFetched: boolean
}

export const useQuotationListAllDatasource = (): Res => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const isFirstMount = useFirstMountState()

  const datasource = useMemo(() => {
    const ds: IDatasource = {
      rowCount: undefined,
      getRows: async (params) => {
        const {
          startRow,
          endRow,
          sortModel,
          filterModel,
          successCallback,
          failCallback,
        } = params

        try {
          if (isFirstMount === true) {
            setIsLoading(true)
            setIsFetching(true)
          }

          if (isFirstMount === false) {
            setIsFetching(true)
          }

          const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>(
            {
              url: api.getQuotationListAll.url,
              params: {
                startRow,
                endRow,
                sortModel: JSON.stringify(sortModel),
                filterModel: JSON.stringify(filterModel),
              },
              method: api.getQuotationListAll.method,
            },
          )

          const getLastRow = (): number => {
            const quotationListCount = data.quotationList.length
            const didReachEndOfTheList = quotationListCount >= endRow - startRow

            if (didReachEndOfTheList === false) {
              const lastRow = startRow + quotationListCount

              return lastRow
            }

            // reached the end of the list
            const lastRow = data.quotationListTotalCount

            return lastRow
          }

          const lastRow = getLastRow()
          successCallback(data.quotationList, lastRow)
        } catch {
          failCallback()
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
