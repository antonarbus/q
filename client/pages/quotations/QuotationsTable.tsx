import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { Box, LinearProgress } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import { useGetQuotationsQuery } from '@entities/quotation'
import { addPlaceholderToFloatingFilters } from './addPlaceholderToFloatingFilters'
import { AgGridStyles } from './AgGridStyles'
import { columnDefs, defaultColDef } from './columnDefs'
import { quotationsAgGridRef } from './quotationsAgGridRef'

export const QuotationsTable = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isFetching } = useGetQuotationsQuery()

  return (
    <Box
      ref={gridContainerRef}
      className='ag-theme-quartz quotations-table'
      sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%' }}
    >
      <AgGridStyles />
      {isFetching && <LinearProgress sx={{ height: '1px', top: '91px', zIndex: 2, mb: '-1px' }} />}
      <AgGridReact<QuotationModelType>
        ref={quotationsAgGridRef}
        rowData={data?.documents}
        getRowId={params => params.data.id}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressCellFocus
        enableCellTextSelection
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
      />
    </Box>
  )
}
