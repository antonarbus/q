import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { useSelectorTyped } from '@lib_instances/store'
import { Box, LinearProgress } from '@mui/material'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef, useEffect } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@features/open_close/open_bookmarks_page'
import { useGetBookmarksQuery } from '@entities/bookmark'
import { type Item } from '@entities/bookmark'
import { LoadingTableOverlay, loadingTableOverlaySignal } from '@shared/components/LoadingTableOverlay'
import { notify } from '@shared/ui/top_msg'
import { addPlaceholderToFloatingFilters } from './addPlaceholderToFloatingFilters'
import { AgGridStyles } from './AgGridStyles'
import { bookmarksAgGridRef } from './bookmarksAgGridRef'
import { columnDefs, defaultColDef } from './columnDefs'
import { DisplayedRowsCount, displayedRowsCountSignal } from './DisplayedRowsCount'
import { NoRowsTableOverlay } from './NoRowsTableOverlay'

export const BookmarksAgGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isSuccess, isLoading, isFetching, isFetched, isError, error, refetch } = useGetBookmarksQuery()
  useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })
  const email = useSelectorTyped(state => state.user.email)

  useEffect(() => {
    void refetch()
  }, [email])

  useUpdateEffect(() => {
    if (isLoading) {
      loadingTableOverlaySignal.value = { areJumpingDotsShown: true, text: 'Loading' }
    }
  }, [isLoading])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'no content') {
        notify({ msg: 'No content', type: 'info', theme: 'dark', position: 'bottom-center' })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'dark', position: 'bottom-center' })
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
      {isFetching && <LinearProgress sx={{ height: '1px', top: '97px', zIndex: 2, mb: '-1px' }} />}
      <AgGridReact<Item>
        ref={bookmarksAgGridRef}
        rowData={data?.documents}
        getRowId={params => params.data.id}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        suppressCellFocus
        enableCellTextSelection
        suppressColumnVirtualisation
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
