import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { Box, LinearProgress } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import { useDisableLoadingOverlayWhenQuotationsAreFetched } from '@features/quotation/open_quotations'
import { useGetQuotationsQuery } from '@entities/quotation'
import { addPlaceholderToFloatingFilters } from './addPlaceholderToFloatingFilters'
import { AgGridStyles } from './AgGridStyles'
import { columnDefs, defaultColDef } from './columnDefs'
import { LoadingTableOverlay } from './LoadingTableOverlay'
import { NoRowsTableOverlay } from './NoRowsTableOverlay'
import { quotationsAgGridRef } from './quotationsAgGridRef'
import { TotalRowsCount, totalRowsSignal } from './TotalRowsCount'

export const QuotationsTable = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isFetching, isFetched } = useGetQuotationsQuery()
  useDisableLoadingOverlayWhenQuotationsAreFetched({ isFetched })

  return (
    <Box
      ref={gridContainerRef}
      className='ag-theme-quartz quotations-table'
      sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%', mt: '10px' }}
    >
      <AgGridStyles />
      <TotalRowsCount />
      {isFetching && <LinearProgress sx={{ height: '1px', top: '91px', zIndex: 2, mb: '-1px' }} />}
      <AgGridReact<QuotationModelType>
        ref={quotationsAgGridRef}
        rowData={data?.documents}
        getRowId={params => params.data.id}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressCellFocus
        enableCellTextSelection
        reactiveCustomComponents={true}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
        onModelUpdated={(params) => {
          const filteredRowCount = params.api.getDisplayedRowCount()
          totalRowsSignal.value = filteredRowCount
        }}
      />
    </Box>
  )
}
