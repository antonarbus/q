import type { ResBody } from '@back/api/bookmark/getBookmarkListHandler'
import { useGetBookmarkListQuery } from '@front/entities/bookmark/api/useGetBookmarkListQuery'
import { LoadingTableOverlay } from '@front/shared/component/LoadingTableOverlay'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@front/shared/component/loading-dots-overlay'
import { agGridSlice } from '@front/shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@front/shared/lib/ag-grid/colDef/getDefaultColDef'
import { DisplayedRowsCount } from '@front/shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@front/shared/lib/ag-grid/components/NoRowsTableOverlay'
import { ProgressGridBar } from '@front/shared/lib/ag-grid/components/ProgressGridBar'
import { GridLayout } from '@front/shared/lib/ag-grid/GridLayout'
import { useRefetchDataOnEmailChange } from '@front/shared/lib/ag-grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@front/shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@front/shared/lib/ag-grid/styles/AgGridStyles'
import { reduxHolder } from '@front/shared/lib/redux'
import {
  AllCommunityModule,
  type FilterChangedEvent,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { columnDefs } from './columnDef'
import { bookmarkListAgGridRef } from './ref/bookmarkListAgGridRef'

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
      <AgGridReact<ResBody['bookmarkList'][number]>
        columnDefs={columnDefs}
        defaultColDef={getDefaultColDef()}
        enableCellTextSelection
        getRowId={(params) => params.data.id}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onFilterChanged={(event: FilterChangedEvent) => {
          // Refresh cells on filter text input to show bold substring
          event.api.refreshCells({ force: true })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          reduxHolder.dispatch(agGridSlice.actions.setCount({ count }))
        }}
        ref={bookmarkListAgGridRef}
        rowData={getBookmarkListQuery.data?.bookmarkList}
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
