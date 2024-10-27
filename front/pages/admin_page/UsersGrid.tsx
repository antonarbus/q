import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { AgGridReact } from 'ag-grid-react' // AG Grid Component
import { type ElementRef, useRef } from 'react'
import { useGetUsersQuery, type User } from '@entities/user'
import { LoadingTableOverlay } from '@shared/components/LoadingTableOverlay'
import {
  DisplayedRowsCount,
  displayedRowsCountSignal,
} from '@shared/lib/ag_grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag_grid/components/NoRowsTableOverlay'
import { columnDefs, defaultColDef } from './columnDefs'
import { usersAgGridRef } from './refs/usersAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag_grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag_grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag_grid/components/ProgressGridBar'
import { useShowLoadingJumpingDots } from '@shared/lib/ag_grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@shared/lib/ag_grid/styles/AgGridStyles'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/loading_dots_overlay'

export const UsersGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<ElementRef<'div'>>(null)
  const { data, isLoading, isFetching, isFetched } = useGetUsersQuery()
  useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })
  useShowLoadingJumpingDots({ isLoading })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={isFetching} />
      <AgGridReact<User>
        ref={usersAgGridRef}
        rowData={data?.users}
        getRowId={(params) => params.data.email}
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
    </GridLayout>
  )
}
