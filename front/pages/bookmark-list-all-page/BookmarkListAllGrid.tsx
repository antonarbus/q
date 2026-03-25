import type { ResBody } from '@back/api/bookmark/getBookmarkListAllHandler'
import { useBookmarkListAll } from '@front/entities/bookmark/api/useBookmarkListAll'
import { LoadingTableOverlay } from '@front/shared/component/LoadingTableOverlay'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@front/shared/component/loading-dots-overlay'
import { agGridSlice } from '@front/shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@front/shared/lib/ag-grid/colDef/getDefaultColDef'
import { DisplayedRowsCount } from '@front/shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@front/shared/lib/ag-grid/components/NoRowsTableOverlay'
import { ProgressGridBar } from '@front/shared/lib/ag-grid/components/ProgressGridBar'
import { GridLayout } from '@front/shared/lib/ag-grid/GridLayout'
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
import { bookmarkListAllAgGridRef } from './ref/bookmarkListAllAgGridRef'

ModuleRegistry.registerModules([AllCommunityModule])

export const BookmarkListAllGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const bookmarkListAll = useBookmarkListAll()
  useShowLoadingJumpingDots({ isLoading: bookmarkListAll.isLoading })

  useDisableLoadingOverlayWhenItemsAreFetched({
    isFetched: bookmarkListAll.isFetched,
  })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={bookmarkListAll.isFetching} />
      <AgGridReact<ResBody['bookmarkList'][number]>
        columnDefs={columnDefs}
        datasource={bookmarkListAll.datasource}
        defaultColDef={getDefaultColDef()}
        enableCellTextSelection
        getRowId={(params) => params.data.id}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onFilterChanged={(event: FilterChangedEvent) => {
          // refresh cells on filter text input to show bold substring
          event.api.refreshCells({ force: true })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          reduxHolder.dispatch(agGridSlice.actions.setCount({ count }))
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
