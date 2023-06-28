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
import { store, useDispatchTyped } from 'client/store'
import { ItemCellRenderer } from './cellRenderers/ItemCellRenderer'
import { QtyCellRenderer } from './cellRenderers/QtyCellRenderer'
import { PriceCellRenderer } from './cellRenderers/PriceCellRenderer'
import { TBoqRow } from 'client/features/items/types'
import { ColDef, ValueGetterParams } from 'ag-grid-community'
import { saveColumnWidth, saveItemHeight, tellItemSavedLocally } from 'client/features/items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'

type TProps = {
  index: number
}

export const BoqTable = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const gridRef = useRef(null)
  const item = store.getState().items?.[index]
  if (item.type !== 'boq') return null

  const defaultColDef = {
    editable: false,
    resizable: true,
    sortable: false,
    filter: 'agTextColumnFilter',
    floatingFilter: false,
    floatingFilterComponentParams: { suppressFilterButton: false },
    wrapHeaderText: true,
    autoHeaderHeight: true,
    wrapText: true,
    autoHeight: true,
    unSortIcon: true,
    suppressMenu: true,
    cellStyle: {
      alignItems: 'flex-end',
    },
    flex: undefined,
    headerComponentParams: { index },
    cellRendererParams: { index },
  }

  const columnDefs: ColDef<TBoqRow>[] = [
    {
      width: 5,
      resizable: false,
      flex: 0,
      cellStyle: { justifyContent: 'center', textAlign: 'center', padding: 0, fontSize: 10, color: 'grey', bottom: '-3px' },
      valueGetter: (params: ValueGetterParams<TBoqRow>) => params.node ? ((params.node.rowIndex || 0) + 1) : null,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: item.boq.column.description.width, // default width is undefined, then flex is 2
      flex: item.boq.column.description.width === undefined ? 2 : undefined, // if we manually set width by resize drag, then flex is undefined
      headerComponent: BoqColumnNameDescription,
      cellRenderer: DescriptionCellRenderer,
    },
    {
      field: 'item',
      headerName: 'Item',
      width: item.boq.column.item.width,
      flex: item.boq.column.item.width === undefined ? 1 : undefined,
      wrapText: true,
      autoHeight: true,
      headerComponent: BoqColumnNameItem,
      cellRenderer: ItemCellRenderer,
      cellStyle: { justifyContent: 'center', textAlign: 'center' },
    },
    {
      field: 'qty',
      headerName: 'Qty',
      width: item.boq.column.qty.width,
      flex: item.boq.column.qty.width === undefined ? 1 : undefined,
      headerComponent: BoqColumnNameQty,
      cellRenderer: QtyCellRenderer,
      cellStyle: { justifyContent: 'center' },
    },
    {
      field: 'price',
      resizable: false,
      headerName: 'Price',
      flex: 1,
      headerComponent: BoqColumnNamePrice,
      cellRenderer: PriceCellRenderer,
      cellStyle: { justifyContent: 'center' },
    },
  ]

  return (
    <AgGridReact<TBoqRow>
      ref={gridRef}
      className='ag-theme-alpine'
      domLayout='autoHeight'
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={item.boq.rows}
      rowHeight={70}
      animateRows
      enableCellTextSelection
      ensureDomOrder
      suppressCellFocus
      suppressContextMenu
      css={{
        margin: 5,
        marginBottom: 15,
      }}
      onColumnResized={(event) => {
        if (!event.finished) return
        // @ts-ignore
        const colId = event?.column?.colId
        // @ts-ignore
        const width = event?.column?.actualWidth
        dispatch(saveColumnWidth({ index, colId, width }))
        // @ts-ignore
        const gridElement = event.api.gridBodyCtrl.eGridBody
        const itemHeight = gridElement.closest('.item-paper')?.clientHeight || 0
        // if we squeeze col text may not fit and rows may resize which changes item block height
        dispatch(saveItemHeight({ index, height: itemHeight }))
        dispatch(tellItemSavedLocally({ index }))
        saveItemsIntoLocalStorage()
      }}
    />
  )
}
