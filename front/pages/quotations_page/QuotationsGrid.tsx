import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { router } from '@lib_instances/router'
import { useSelectorTyped } from '@lib_instances/store'
import { Box, LinearProgress } from '@mui/material'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDisableLoadingOverlayWhenQuotationsAreFetched } from '@features/open_close/open_quotations_page'
import { useGetQuotationsQuery, type Quotation } from '@entities/quotation'
import {
  LoadingTableOverlay,
  loadingTableOverlaySignal,
} from '@shared/components/LoadingTableOverlay'
import { route } from '@shared/consts/route'
import {
  DisplayedRowsCount,
  displayedRowsCountSignal,
} from '@shared/lib/ag_grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag_grid/components/NoRowsTableOverlay'
import { notify } from '@shared/toast'
import { columnDefs, defaultColDef } from './columnDefs'
import { quotationsAgGridRef } from './refs/quotationsAgGridRef'
import { AgGridStyles } from './styles/AgGridStyles'
import { addPlaceholderToFloatingFilters } from './utils/addPlaceholderToFloatingFilters'

export const QuotationsGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isLoading, isFetching, isFetched, isError, error, refetch } =
    useGetQuotationsQuery()
  useDisableLoadingOverlayWhenQuotationsAreFetched({ isFetched })
  const email = useSelectorTyped((state) => state.user.email)

  useEffect(() => {
    if (email) {
      void refetch()
    }
  }, [email])

  useUpdateEffect(() => {
    if (isLoading) {
      loadingTableOverlaySignal.value = {
        areJumpingDotsShown: true,
        text: 'Loading',
      }
    }
  }, [isLoading])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'Not logged in') {
        void router.navigate(`/${route.quotations}/${route.login}`)
      }

      notify({
        msg: 'Internal error',
        type: 'warn',
        theme: 'dark',
        position: 'bottom-center',
      })
    }
  }, [isError])

  return (
    <Box
      ref={gridContainerRef}
      className='ag-theme-quartz q-table'
      sx={{
        flexGrow: 1,
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        mt: '10px',
      }}
    >
      <AgGridStyles />
      <DisplayedRowsCount />
      {isFetching && (
        <LinearProgress
          sx={{ height: '1px', top: '97px', zIndex: 2, mb: '-1px' }}
        />
      )}
      <AgGridReact<Quotation>
        ref={quotationsAgGridRef}
        rowData={data?.quotations ?? []}
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
    </Box>
  )
}
