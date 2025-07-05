import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type FilterChangedEvent,
  type IDatasource,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { useRef } from 'react'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { axiosWithAuth } from '@shared/lib/axios'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { columnDefs, defaultColDef } from './columnDef'
import { bookmarkListAgGridRef } from './ref/bookmarkListAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { useRefetchDataOnEmailChange } from '@shared/lib/ag-grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { api } from '@back/api'
import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import type { AxiosResponse } from 'axios'

ModuleRegistry.registerModules([AllCommunityModule])

export const BookmarkListAllGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)

  // const { data, isLoading, isFetching, isFetched, refetch } =
  //   useGetBookmarksQuery()

  // useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })
  // useRefetchDataOnEmailChange({ refetch })
  // useShowLoadingJumpingDots({ isLoading })

  // Infinite row model datasource for ag-Grid
  // Infinite row model datasource for ag-Grid
  const datasource: IDatasource = {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async getRows(params) {
      const { startRow, endRow } = params

      try {
        const { data } = await axiosWithAuth<ResBody, AxiosResponse<ResBody>>({
          url: api.getBookmarkListAll.url,
          params: { startRow, endRow },
          method: api.getBookmarkListAll.method,
        })

        let isValid = false
        let bookmarksResult: ItemPick[] = []
        let totalCountResult: number | undefined

        const isObj = typeof data === 'object' && data !== null

        if (isObj === true) {
          const hasBookmarks = Object.hasOwn(data, 'bookmarks')

          const bookmarksArr =
            hasBookmarks === true &&
            Array.isArray((data as { bookmarks?: unknown }).bookmarks)

          if (bookmarksArr === true) {
            const maybeResult = data as Record<string, unknown>
            const bookmarks = maybeResult.bookmarks as ItemPick[]

            const totalCount =
              typeof maybeResult.totalCount === 'number'
                ? maybeResult.totalCount
                : undefined

            bookmarksResult = bookmarks
            totalCountResult = totalCount
            isValid = true
          }
        }

        if (isValid === true) {
          params.successCallback(bookmarksResult, totalCountResult)
        } else {
          params.failCallback()
        }
      } catch {
        params.failCallback()
      }
    },
  }

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      {/* <ProgressGridBar isShown={isFetching} /> */}
      <AgGridReact<ItemPick>
        columnDefs={columnDefs}
        datasource={datasource}
        defaultColDef={defaultColDef}
        enableCellTextSelection
        getRowId={(params) => params.data.id}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onFilterChanged={(event: FilterChangedEvent) => {
          // refresh cells on filter text input to show bold substring
          event.api.refreshCells({ force: true })
        }}
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          dispatch(agGridSlice.actions.setCount({ count }))
        }}
        ref={bookmarkListAgGridRef}
        // rowData={data?.bookmarks}
        rowModelType='infinite'
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
