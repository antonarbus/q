import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import type { ModelUpdatedEvent } from 'ag-grid-community'
import { router } from '@lib_instances/router'
import { useSelectorTyped } from '@lib_instances/store'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef, useEffect, useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { useDisableLoadingOverlayWhenBookmarksAreFetched } from '@features/open_close/open_bookmarks_page'
import { useGetBookmarksQuery, type Item } from '@entities/bookmark'
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
import { bookmarksAgGridRef } from './refs/bookmarksAgGridRef'
import { AgGridStyles } from './styles/AgGridStyles'
import { ProgressBar } from './ProgressBar'
import { GridLayout } from './GridLayout'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag_grid/utils/addPlaceholderToFloatingFilters'

export const BookmarksGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    isError,
    error,
    refetch: getBookmarks,
  } = useGetBookmarksQuery()

  useDisableLoadingOverlayWhenBookmarksAreFetched({ isFetched })
  const email = useSelectorTyped((state) => state.user.email)

  useEffect(() => {
    if (email) {
      void getBookmarks()
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
        void router.navigate(`/${route.bookmarks}/${route.login}`)
      }

      notify({
        msg: 'Internal error',
        type: 'warn',
        theme: 'dark',
        position: 'bottom-center',
      })
    }
  }, [isError])

  const updateRowCount = useCallback(
    (params: ModelUpdatedEvent<Item>): void => {
      displayedRowsCountSignal.value = params.api.getDisplayedRowCount()
    },
    [],
  )

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressBar isShown={isFetching} />
      <AgGridReact<Item>
        ref={bookmarksAgGridRef}
        rowData={data?.bookmarks}
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
        onModelUpdated={updateRowCount}
      />
    </GridLayout>
  )
}
