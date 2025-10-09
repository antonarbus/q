import { api } from '@back/api'
import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/file/getFileListAllHandler'
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

export const useFileListAllDatasource = (): Res => {
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

          const { data } = await axiosWithAuth<
            ResBody,
            AxiosResponse<ResBody>,
            Payload
          >({
            url: api.getFileListAll.url,
            method: api.getFileListAll.method,
            data: {
              startRow,
              endRow,
              sortModel,
              filterModel,
            },
          })

          const getLastRow = (): number => {
            const fileListCount = data.fileList.length
            const didReachEndOfTheList = fileListCount >= endRow - startRow

            if (didReachEndOfTheList === false) {
              const lastRow = startRow + fileListCount

              return lastRow
            }

            // reached the end of the list
            const lastRow = data.fileListTotalCount

            return lastRow
          }

          const lastRow = getLastRow()
          successCallback(data.fileList, lastRow)
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
