import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './agGridCustom.css'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { BoqColumnNameDescription } from './columnNameComponents/BoqColumnNameDescription'
import { BoqColumnNameQty } from './columnNameComponents/BoqColumnNameQty'
import { BoqColumnNamePrice } from './columnNameComponents/BoqColumnNamePrice'
import { BoqColumnNameItem } from './columnNameComponents/BoqColumnNameItem'
import { DescriptionCellRenderer } from './cellRenderers/DescriptionCellRenderer'
import { store } from 'client/store'
import { ItemCellRenderer } from './cellRenderers/ItemCellRenderer'
import { QtyCellRenderer } from './cellRenderers/QtyCellRenderer'
import { PriceCellRenderer } from './cellRenderers/PriceCellRenderer'

type TProps = {
  index: number
}

const defaultColDef = {
  width: 150,
  // minWidth: 150,
  editable: false,
  filter: 'agTextColumnFilter',
  floatingFilter: false,
  floatingFilterComponentParams: { suppressFilterButton: false },
  resizable: true,
  sortable: false,
  unSortIcon: true,
  suppressMenu: true,
  cellStyle: { alignItems: 'flex-end', lineHeight: 0 },
  flex: 1
}

export const BoqTable = ({ index }: TProps) => {
  // console.log('boqTableIndex', index)
  const gridRef = useRef(null)

  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const rowData = item.boq.rows

  const columnDefs = [
    {
      width: 5,
      sortable: false,
      resizable: false,
      flex: 0,
      cellStyle: { justifyContent: 'center', textAlign: 'center', padding: 0, fontSize: 10, color: 'grey' },
      valueGetter: (params) => params.node ? params.node.rowIndex + 1 : null,
    },
    {
      field: 'description',
      headerName: 'Description',
      headerComponent: BoqColumnNameDescription,
      headerComponentParams: { index },
      wrapHeaderText: true,
      autoHeaderHeight: true,
      width: 250,
      minWidth: 250,
      wrapText: true,
      autoHeight: true,
      flex: 2,
      cellRenderer: DescriptionCellRenderer,
      cellRendererParams: { index },
      cellStyle: { justifyContent: 'center', textAlign: 'center' }
    },
    {
      field: 'item',
      headerName: 'Item',
      headerComponent: BoqColumnNameItem,
      headerComponentParams: { index },
      wrapHeaderText: true,
      autoHeaderHeight: true,
      width: 200,
      minWidth: 200,
      wrapText: true,
      autoHeight: true,
      cellRenderer: ItemCellRenderer,
      cellRendererParams: { index },
      cellStyle: { justifyContent: 'center', textAlign: 'center' }
    },
    {
      field: 'qty',
      headerName: 'Qty',
      headerComponent: BoqColumnNameQty,
      headerComponentParams: { index },
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellRenderer: QtyCellRenderer,
      cellRendererParams: { index },
      cellStyle: { justifyContent: 'center' }
    },
    {
      field: 'price',
      headerName: 'Price',
      headerComponent: BoqColumnNamePrice,
      headerComponentParams: { index },
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellRenderer: PriceCellRenderer,
      cellRendererParams: { index },
      cellStyle: { justifyContent: 'center' }
    }
  ]

  return (
    <AgGridReact
      // ref={gridRef}
      className='ag-theme-alpine'
      domLayout='autoHeight'
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={rowData}
      rowHeight={70}
      animateRows
      enableCellTextSelection
      ensureDomOrder
      suppressCellFocus
      stopEditingWhenCellsLoseFocus
      suppressContextMenu
      css={{
        margin: 5,
        marginBottom: 15
      }}
      // loadingOverlayComponent={LoadingOverlay}
      // onFirstDataRendered={showReceiversAmount}
      // onModelUpdated={showReceiversAmount}
      // onFilterChanged={showReceiversAmount}
      // onGridReady={() => setIsTableReady(true)}
    />
  )
}
