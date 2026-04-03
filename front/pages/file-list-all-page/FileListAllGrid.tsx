import type { ResBody } from '@back/api/file/getFileListAllHandler'
import { useFileListAll } from '@front/entities/file/api/useFileListAll'
import { LoadingTableOverlay } from '@front/shared/component/LoadingTableOverlay'
import { useDisableLoadingOverlayWhenItemsAreFetched } from '@front/shared/component/loading-dots-overlay'
import { agGridSlice } from '@front/shared/lib/ag-grid/agGridSlice'
import { getDefaultColDef } from '@front/shared/lib/ag-grid/colDef/getDefaultColDef'
import { DisplayedRowsCount } from '@front/shared/lib/ag-grid/components/DisplayedRowsCount'
import { NoRowsTableOverlay } from '@front/shared/lib/ag-grid/components/NoRowsTableOverlay'
import { ProgressGridBar } from '@front/shared/lib/ag-grid/components/ProgressGridBar'
import { GridLayout } from '@front/shared/lib/ag-grid/GridLayout'
import { useShowLoadingJumpingDots } from '@front/shared/lib/ag-grid/hooks/useShowLoadingJumpingDots'
import { AgGridStyles } from '@front/shared/lib/ag-grid/styles/AgGridStyles'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
import type { FilterChangedEvent } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { columnDefs } from './columnDef'
import { fileListAllAgGridRef } from './ref/fileListAllAgGridRef'

ModuleRegistry.registerModules([AllCommunityModule])

export const FileListAllGrid = (): React.JSX.Element => {
  const gridContainerRef = useRef<React.ComponentRef<'div'> | null>(null)
  const fileListAll = useFileListAll()
  useShowLoadingJumpingDots({ isLoading: fileListAll.isLoading })

  useDisableLoadingOverlayWhenItemsAreFetched({
    isFetched: fileListAll.isFetched,
  })

  return (
    <GridLayout gridContainerRef={gridContainerRef}>
      <AgGridStyles />
      <DisplayedRowsCount />
      <ProgressGridBar isShown={fileListAll.isFetching} />
      <AgGridReact<ResBody['fileList'][number]>
        columnDefs={columnDefs}
        datasource={fileListAll.datasource}
        defaultColDef={getDefaultColDef()}
        enableCellTextSelection
        getRowId={(params) => params.data.id}
        loadingOverlayComponent={LoadingTableOverlay}
        noRowsOverlayComponent={NoRowsTableOverlay}
        onFilterChanged={(event: FilterChangedEvent) => {
          // refresh cells on filter text input to show bold substring
          event.api.refreshCells({ force: true })
        }}
        onModelUpdated={(params) => {
          const count = params.api.getDisplayedRowCount()
          reduxHolder.dispatch(agGridSlice.actions.setCount({ count }))
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
