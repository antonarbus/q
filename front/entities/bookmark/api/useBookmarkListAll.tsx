import { route } from '@back/api/route'
import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import { axiosHolder } from '@front/shared/lib/axios/axiosHolder'
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

export const useBookmarkListAll = (): Res => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const isFirstMount = useFirstMountState()

  const datasource = useMemo(() => {
    const ds: IDatasource = {
      rowCount: undefined,
      getRows: async (params) => {
        try {
          if (isFirstMount === true) {
            setIsLoading(true)
            setIsFetching(true)
          }

          if (isFirstMount === false) {
            setIsFetching(true)
          }

          const response = await axiosHolder.axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
            url: route.getBookmarkListAll.url,
            method: route.getBookmarkListAll.method,
            params: {
              startRow: params.startRow,
              endRow: params.endRow,
              sortModel: JSON.stringify(params.sortModel),
              filterModel: JSON.stringify(params.filterModel),
            },
          })

          const getLastRow = (): number => {
            const bookmarkListCount = response.data.bookmarkList.length

            const didReachEndOfTheList = bookmarkListCount >= params.endRow - params.startRow

            if (didReachEndOfTheList === false) {
              const lastRow = params.startRow + bookmarkListCount

              return lastRow
            }

            // reached the end of the list
            const lastRow = response.data.bookmarkListTotalCount

            return lastRow
          }

          const lastRow = getLastRow()
          params.successCallback(response.data.bookmarkList, lastRow)
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
