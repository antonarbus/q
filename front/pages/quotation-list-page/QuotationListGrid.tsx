import type { ResBody } from '@back/api/quotation/getQuotationListHandler'
import { useGetQuotationListQuery } from '@front/entities/quotation/api/useGetQuotationListQuery'
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
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
import type { FilterChangedEvent } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { columnDefs } from './columnDef'
import { quotationListAgGridRef } from './ref/quotationListAgGridRef'

ModuleRegistry.registerModules([AllCommunityModule])

export const QuotationListGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
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
      <AgGridReact<ResBody['quotationList'][number]>
        columnDefs={columnDefs}
        defaultColDef={getDefaultColDef()}
        enableCellTextSelection={true}
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
        ref={quotationListAgGridRef}
        rowData={getQuotationListQuery.data?.quotationList}
        suppressCellFocus={true}
        suppressColumnVirtualisation={true}
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
