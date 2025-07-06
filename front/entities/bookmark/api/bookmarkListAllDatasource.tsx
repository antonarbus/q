/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { axiosWithAuth } from '@shared/lib/axios'
import { api } from '@back/api'
import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AxiosResponse } from 'axios'
import type { IDatasource } from 'ag-grid-community'

type Props = {
  startRow: number
  endRow: number
}

const getBookmarkListAll = async ({
  startRow,
  endRow,
}: Props): Promise<ResBody> => {
  const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
    url: api.getBookmarkListAll.url,
    params: { startRow, endRow },
    method: api.getBookmarkListAll.method,
  })

  return data
}

export const useBookmarkListAllDatasource = (): IDatasource => {
  const datasource: IDatasource = {
    rowCount: undefined,
    getRows: async (params) => {
      const { startRow, endRow, successCallback, failCallback } = params

      try {
        const { bookmarkList, bookmarkListTotalCount } =
          await getBookmarkListAll({
            startRow,
            endRow,
          })

        const getLastRow = (): number => {
          const bookmarkListCount = bookmarkList.length
          const didReachEndOfTheList = bookmarkListCount >= endRow - startRow

          if (didReachEndOfTheList === false) {
            const lastRow = startRow + bookmarkListCount

            return lastRow
          }

          // reached the end of the list
          const lastRow = bookmarkListTotalCount

          return lastRow
        }

        const lastRow = getLastRow()

        successCallback(bookmarkList, lastRow)
      } catch {
        failCallback()
      }
    },
  }

  return datasource
}
