import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type FilterChangedEvent,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { useGetBookmarkListQuery } from '@entities/bookmark'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { columnDefs } from './columnDef'
import { bookmarkListAgGridRef } from './ref/bookmarkListAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { useRefetchDataOnEmailChange } from '@shared/lib/ag-grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@shared/lib/ag-grid/colDef/getDefaultColDef'

ModuleRegistry.registerModules([AllCommunityModule])

export const BookmarkListGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useDisableLoadingOverlayWhenItemsAreFetched({
    isFetched: getBookmarkListQuery.isFetched,
  })

  useRefetchDataOnEmailChange({ refetch: getBookmarkListQuery.refetch })
  useShowLoadingJumpingDots({ isLoading: getBookmarkListQuery.isLoading })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={getBookmarkListQuery.isFetching} />
      <AgGridReact<ItemPick>
        columnDefs={columnDefs}
        defaultColDef={getDefaultColDef()}
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
        rowData={getBookmarkListQuery.data?.bookmarks}
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
