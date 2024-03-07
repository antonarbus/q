import { Box } from '@mui/material'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'

export const QuotationsTable = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const gridRef = useRef<AgGridReact<ReceiptsTableFields>>(null)

  return (
    <Box
      className='ag-theme-alpine ag-receipt-table'
      ref={gridContainerRef}
      sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%' }}
    >
      {/* <AgGridHeerosStyles /> */}
      <AgGridReact<ReceiptsTableFields>
        ref={gridRef}
        // rowData={allReceipts.length === 0 ? initialReceipts : allReceipts}
        // defaultColDef={defaultColDef}
        // columnDefs={columnDefs}
        animateRows
        suppressRowClickSelection
        enableRangeSelection={true}
        ensureDomOrder
        suppressScrollOnNewData
        suppressColumnVirtualisation
        headerHeight={45}
        floatingFiltersHeight={45}
      />
    </Box>
  )
}
