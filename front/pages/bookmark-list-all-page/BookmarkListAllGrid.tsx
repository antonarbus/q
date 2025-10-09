import type { ItemPick } from '@back/api/bookmark/getBookmarkListAllHandler'
import { useBookmarkListAllDatasource } from '@entities/bookmark'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@shared/lib/ag-grid/colDef/getDefaultColDef'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { dispatch } from '@shared/lib/redux'
import {
  AllCommunityModule,
  type FilterChangedEvent,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { type ComponentRef, type JSX, useRef } from 'react'
import { columnDefs } from './columnDef'
import { bookmarkListAllAgGridRef } from './ref/bookmarkListAllAgGridRef'

ModuleRegistry.registerModules([AllCommunityModule])

export const BookmarkListAllGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ComponentRef<'div'> | null>(null)

  const { datasource, isLoading, isFetching, isFetched } =
    useBookmarkListAllDatasource()

  useShowLoadingJumpingDots({ isLoading })
  useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={isFetching} />
      <AgGridReact<ItemPick>
        columnDefs={columnDefs}
        datasource={datasource}
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
        ref={bookmarkListAllAgGridRef}
        rowModelType='infinite'
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
