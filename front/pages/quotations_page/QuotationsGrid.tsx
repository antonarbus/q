import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { useRef } from 'react'
import { useGetQuotationsQuery } from '@entities/quotation'
import { LoadingTableOverlay } from '@shared/components/LoadingTableOverlay'
import { NoRowsTableOverlay } from '@shared/lib/ag_grid/components/NoRowsTableOverlay'
import { columnDefs, defaultColDef } from './columnDefs'
import { quotationsAgGridRef } from './refs/quotationsAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag_grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag_grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag_grid/components/ProgressGridBar'
import { useRefetchDataOnEmailChange } from '@shared/lib/ag_grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@shared/lib/ag_grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag_grid/styles/AgGridStyles'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/loading_dots_overlay'
import type { QuotationPick } from '@back/api/quotation/getQuotationsRouter'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag_grid/agGridSlice'
import { DisplayedRowsCount } from '@shared/lib/ag_grid/components/DisplayedRowsCount'

ModuleRegistry.registerModules([AllCommunityModule])

export const QuotationsGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)

  const { data, isLoading, isFetching, isFetched, refetch } =
    useGetQuotationsQuery()

  useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })
  useRefetchDataOnEmailChange({ refetch })
  useShowLoadingJumpingDots({ isLoading })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={isFetching} />
      <AgGridReact<QuotationPick>
        ref={quotationsAgGridRef}
        theme={themeQuartz}
        rowData={data?.quotations}
        getRowId={(params) => params.data.id}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressCellFocus
        suppressColumnVirtualisation
        enableCellTextSelection
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          dispatch(agGridSlice.actions.setCount({ count }))
        }}
      />
    </GridLayout>
  )
}
