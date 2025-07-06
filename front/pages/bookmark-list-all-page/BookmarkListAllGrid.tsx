import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type FilterChangedEvent,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { useRef } from 'react'
import { useBookmarkListAllDatasource } from '@entities/bookmark'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { columnDefs, defaultColDef } from './columnDef'
import { bookmarkListAgGridRef } from './ref/bookmarkListAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import type { ItemPick } from '@back/api/bookmark/getBookmarkListHandler'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
// import { api } from '@back/api'
// import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
// import type { AxiosResponse } from 'axios'

ModuleRegistry.registerModules([AllCommunityModule])

export const BookmarkListAllGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)

  // const { data, isLoading, isFetching, isFetched, refetch } =
  //   useGetBookmarksQuery()

  // useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })
  // useShowLoadingJumpingDots({ isLoading })

  const datasource = useBookmarkListAllDatasource()

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
        rowModelType='infinite'
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
