import type { ResBody } from '@back/api/quotation/getQuotationListAllHandler'
import { useQuotationListAll } from '@front/entities/quotation/api/useQuotationListAll'
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
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
import type { FilterChangedEvent } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { columnDefs } from './columnDef'
import { quotationListAllAgGridRef } from './ref/quotationListAllAgGridRef'

ModuleRegistry.registerModules([AllCommunityModule])

export const QuotationListAllGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const quotationListAll = useQuotationListAll()
  useShowLoadingJumpingDots({ isLoading: quotationListAll.isLoading })

  useDisableLoadingOverlayWhenItemsAreFetched({
    isFetched: quotationListAll.isFetched,
  })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={quotationListAll.isFetching} />
      <AgGridReact<ResBody['quotationList'][number]>
        columnDefs={columnDefs}
        datasource={quotationListAll.datasource}
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
        ref={quotationListAllAgGridRef}
        rowModelType='infinite'
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
