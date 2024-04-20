import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { useSelectorTyped } from '@lib_instances/store'
import { Box, LinearProgress } from '@mui/material'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDisableLoadingOverlayWhenQuotationsAreFetched } from '@features/quotation/open_quotations'
import { useGetQuotationsQuery } from '@entities/quotation'
import { type Quotation } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'
import { addPlaceholderToFloatingFilters } from './addPlaceholderToFloatingFilters'
import { AgGridStyles } from './AgGridStyles'
import { columnDefs, defaultColDef } from './columnDefs'
import { DisplayedRowsCount, displayedRowsCountSignal } from './DisplayedRowsCount'
import { LoadingTableOverlay } from './LoadingTableOverlay'
import { NoRowsTableOverlay } from './NoRowsTableOverlay'
import { quotationsAgGridRef } from './quotationsAgGridRef'

export const QuotationsTable = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isSuccess, isFetching, isFetched, isError, error, refetch } = useGetQuotationsQuery()
  useDisableLoadingOverlayWhenQuotationsAreFetched({ isFetched })
  const email = useSelectorTyped(state => state.user.email)

  useEffect(() => {
    void refetch()
  }, [email])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'no content') {
        notify({ msg: 'No content', type: 'info', theme: 'dark', position: 'bottom-center' })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'something happened') {
        notify({ msg: 'Something happened', type: 'warn', theme: 'dark', position: 'bottom-center' })
        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'dark', position: 'bottom-center' })
    }
  }, [isError])

  return (
    <Box
      ref={gridContainerRef}
      className='ag-theme-quartz quotations-table'
      sx={{ flexGrow: 1, position: 'relative', overflow: 'visible', height: '100%', mt: '10px' }}
    >
      <AgGridStyles />
      <DisplayedRowsCount />
      {isFetching && <LinearProgress sx={{ height: '1px', top: '91px', zIndex: 2, mb: '-1px' }} />}
      <AgGridReact<Quotation>
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
          displayedRowsCountSignal.value = params.api.getDisplayedRowCount()
        }}
      />
    </Box>
  )
}
