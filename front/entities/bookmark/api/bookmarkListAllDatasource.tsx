/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { axiosWithAuth } from '@shared/lib/axios'
import { api } from '@back/api'
import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AxiosResponse } from 'axios'
import type { IDatasource, IGetRowsParams } from 'ag-grid-community'
import { useFirstMountState } from 'react-use'
import { useMemo, useState } from 'react'

// type FilterModel = Record<string, any>

type Res = {
  datasource: IDatasource
  isLoading: boolean
  isFetching: boolean
  isFetched: boolean
}

export const useBookmarkListAllDatasource = (): Res => {
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          filterModel,
          successCallback,
          failCallback,
        } = params

        console.log('🚀 ~ params:', params)

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
              url: api.getBookmarkListAll.url,
              params: {
                startRow,
                endRow,
                sortModel: JSON.stringify(sortModel),
                filterModel: JSON.stringify(filterModel),
              },
              method: api.getBookmarkListAll.method,
            },
          )

          const getLastRow = (): number => {
            const bookmarkListCount = data.bookmarkList.length
            const didReachEndOfTheList = bookmarkListCount >= endRow - startRow

            if (didReachEndOfTheList === false) {
              const lastRow = startRow + bookmarkListCount

              return lastRow
            }

            // reached the end of the list
            const lastRow = data.bookmarkListTotalCount

            return lastRow
          }

          const lastRow = getLastRow()
          successCallback(data.bookmarkList, lastRow)
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
