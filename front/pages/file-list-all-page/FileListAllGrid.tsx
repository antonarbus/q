import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type FilterChangedEvent,
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import type { JSX, ComponentRef } from 'react'
import { useFileListAllDatasource } from '@entities/file'
import { LoadingTableOverlay } from '@shared/component/LoadingTableOverlay'
import { DisplayedRowsCount } from '@shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@shared/lib/ag-grid/components/NoRowsTableOverlay'
import { columnDefs } from './columnDef'
import { fileListAllAgGridRef } from './ref/fileListAllAgGridRef'
import { addPlaceholderToFloatingFilters } from '@shared/lib/ag-grid/utils/addPlaceholderToFloatingFilters'
import { GridLayout } from '@shared/lib/ag-grid/GridLayout'
import { ProgressGridBar } from '@shared/lib/ag-grid/components/ProgressGridBar'
import { useShowLoadingJumpingDots } from '@shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@shared/component/loading-dots-overlay'
import { AgGridStyles } from '@shared/lib/ag-grid/styles/AgGridStyles'
import type { Item } from '@back/api/file/getFileListAllHandler'
import { dispatch } from '@shared/lib/redux'
import { agGridSlice } from '@shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@shared/lib/ag-grid/colDef/getDefaultColDef'

ModuleRegistry.registerModules([AllCommunityModule])

export const FileListAllGrid = (): JSX.Element => {
  const gridContainerRef = useRef<ComponentRef<'div'> | null>(null)

  const { datasource, isLoading, isFetching, isFetched } =
    useFileListAllDatasource()

  useShowLoadingJumpingDots({ isLoading })
  useDisableLoadingOverlayWhenItemsAreFetched({ isFetched })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={isFetching} />
      <AgGridReact<Item>
        columnDefs={columnDefs}
        datasource={datasource}
        defaultColDef={getDefaultColDef()}
        enableCellTextSelection
        getRowId={(params) => params.data.id}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onFilterChanged={(event: FilterChangedEvent) => {
          // refresh cells on filter text input to show bold substring
          event.api.refreshCells({ force: true })
        }}
        onGridReady={() => {
          addPlaceholderToFloatingFilters({ gridContainerRef })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          dispatch(agGridSlice.actions.setCount({ count }))
        }}
        ref={fileListAllAgGridRef}
        rowModelType='infinite'
        suppressCellFocus
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </GridLayout>
  )
}
