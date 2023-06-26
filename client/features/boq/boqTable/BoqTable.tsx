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

export const BoqTable = ({ index }: TProps) => {
  const gridRef = useRef(null)
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null
  const rowData = item.boq.rows

  const defaultColDef = {
    width: 150,
    // minWidth: 150,
    editable: false,
    filter: 'agTextColumnFilter',
    floatingFilter: false,
    floatingFilterComponentParams: { suppressFilterButton: false },
    resizable: true,
    sortable: false,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    wrapText: true,
    autoHeight: true,
    unSortIcon: true,
    suppressMenu: true,
    cellStyle: {
      alignItems: 'flex-end',
      // lineHeight: 0,
      // height: '100%',
      // background: 'yellow'
    },
    flex: 1,
    headerComponentParams: { index },
    cellRendererParams: { index },
  }

  const columnDefs = [
    {
      width: 5,
      resizable: false,
      flex: 0,
      cellStyle: { justifyContent: 'center', textAlign: 'center', padding: 0, fontSize: 10, color: 'grey', bottom: '-3px' },
      valueGetter: (params) => params.node ? params.node.rowIndex + 1 : null,
    },
    {
      field: 'description',
      headerName: 'Description',
      // todo: keep col width in redux
      width: 200,
      minWidth: 200,
      flex: 2,
      headerComponent: BoqColumnNameDescription,
      cellRenderer: DescriptionCellRenderer,
      cellStyle: {
        // justifyContent: 'left',
        // textAlign: 'center',
        // flexGrow: 1,
      },
    },
    {
      field: 'item',
      headerName: 'Item',
      width: 100,
      minWidth: 100,
      flex: 1,
      wrapText: true,
      autoHeight: true,
      headerComponent: BoqColumnNameItem,
      cellRenderer: ItemCellRenderer,
      cellStyle: { justifyContent: 'center', textAlign: 'center' },
    },
    {
      field: 'qty',
      headerName: 'Qty',
      width: 100,
      minWidth: 100,
      flex: 1,
      headerComponent: BoqColumnNameQty,
      cellRenderer: QtyCellRenderer,
      cellStyle: { justifyContent: 'center' },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      minWidth: 100,
      flex: 1,
      headerComponent: BoqColumnNamePrice,
      cellRenderer: PriceCellRenderer,
      cellStyle: { justifyContent: 'center' },
    },
  ]

  return (
    <AgGridReact
      ref={gridRef}
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
      // stopEditingWhenCellsLoseFocus
      suppressContextMenu
      css={{
        margin: 5,
        marginBottom: 15,
      }}
      // loadingOverlayComponent={LoadingOverlay}
      // onFirstDataRendered={showReceiversAmount}
      // onModelUpdated={showReceiversAmount}
      // onFilterChanged={showReceiversAmount}
      // onGridReady={() => setIsTableReady(true)}
    />
  )
}
