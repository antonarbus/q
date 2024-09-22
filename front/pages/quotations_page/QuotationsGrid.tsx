import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import { useDisableLoadingOverlayWhenQuotationsAreFetched } from '@features/open_close/open_quotations_page'
import { useGetQuotationsQuery, type Quotation } from '@entities/quotation'
import { LoadingTableOverlay } from '@shared/components/LoadingTableOverlay'
import {
  DisplayedRowsCount,
  displayedRowsCountSignal,
} from '@shared/lib/ag_grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag_grid/components/NoRowsTableOverlay'
import { columnDefs, defaultColDef } from './columnDefs'
import { quotationsAgGridRef } from './refs/quotationsAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag_grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag_grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag_grid/components/ProgressGridBar'
import { useRefetchDataOnEmailChange } from '@shared/lib/ag_grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@shared/lib/ag_grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag_grid/styles/AgGridStyles'

export const QuotationsGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isLoading, isFetching, isFetched, refetch } =
    useGetQuotationsQuery()
  useDisableLoadingOverlayWhenQuotationsAreFetched({ isFetched })
  useRefetchDataOnEmailChange({ refetch })
  useShowLoadingJumpingDots({ isLoading })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={isFetching} />
      <AgGridReact<Quotation>
        ref={quotationsAgGridRef}
        rowData={data?.quotations}
        getRowId={(params) => params.data.id}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressCellFocus
        suppressColumnVirtualisation
        enableCellTextSelection
        reactiveCustomComponents={true}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
        onModelUpdated={(params) => {
          displayedRowsCountSignal.value = params.api.getDisplayedRowCount()
        }}
      />
    </GridLayout>
  )
}
