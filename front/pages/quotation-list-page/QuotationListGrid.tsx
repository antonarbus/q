import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type FilterChangedEvent,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import type { JSX, ComponentRef } from 'react'
import { useGetQuotationListQuery } from '@entities/quotation'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { columnDefs } from './columnDef'
import { quotationListAgGridRef } from './ref/quotationListAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { useRefetchDataOnEmailChange } from '@shared/lib/ag-grid/hooks/useRefetchDataOnEmailChange'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { getDefaultColDef } from '@shared/lib/ag-grid/colDef/getDefaultColDef'

ModuleRegistry.registerModules([AllCommunityModule])

export const QuotationListGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ComponentRef<'div'> | null>(null)
  const getQuotationListQuery = useGetQuotationListQuery()

  useDisableLoadingOverlayWhenItemsAreFetched({
    isFetched: getQuotationListQuery.isFetched,
  })

  useRefetchDataOnEmailChange({ refetch: getQuotationListQuery.refetch })
  useShowLoadingJumpingDots({ isLoading: getQuotationListQuery.isLoading })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={getQuotationListQuery.isFetching} />
      <AgGridReact<QuotationPick>
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
        ref={quotationListAgGridRef}
        rowData={getQuotationListQuery.data?.quotations}
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
