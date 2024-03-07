import { Box } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { useGetQuotations } from '@entities/quotations'
import { columnDefs, defaultColDef } from './columnDefs'
import { quotationsAgGridRef } from './quotationsAgGridRef'

export const QuotationsTable = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isFetching } = useGetQuotations()
  console.log('🚀 ~ data:', data)

  return (
    <Box
      className='ag-theme-quartz ag-quotations-table'
      ref={gridContainerRef}
      sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%' }}
    >
      {/* <AgGridHeerosStyles /> */}
      <AgGridReact<QuotationModelType>
        ref={quotationsAgGridRef}
        rowData={data?.documents}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        // animateRows
        suppressRowClickSelection
        // enableRangeSelection={true}
        // ensureDomOrder
        // suppressScrollOnNewData
        // suppressColumnVirtualisation
        headerHeight={45}
        floatingFiltersHeight={45}
      />
    </Box>
  )
}
