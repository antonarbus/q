import { TRefResizable } from 'client/types'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './agGridCustom.css'
import { AgGridReact } from 'ag-grid-react'
import { useRef } from 'react'
import { DescriptionHeader } from './DescriptionHeader'

type TProps = {
  index: number
  itemRef: TRefResizable
}

// export const DescriptionHeader = () => {
//   return (
//     <span>
//       Description
//     </span>
//   )
// }

export const RowNumRenderer = ({ value }) => {
  return (
    <span
      css={{
        fontSize: 10,
        color: 'grey'
      }}
    >
      { value }
    </span>
  )
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

const rowData = [
  { description: 'description 1', item: 50, qty: 10, price: 500 },
  { description: 'description 2', item: 50, qty: 10, price: 500 },
  { description: 'description 3', item: 50, qty: 10, price: 500 },
]

export const BoqTable = ({ index, itemRef }: TProps) => {
  const gridRef = useRef(null)

  const columnDefs = [
    {
      width: 5,
      sortable: false,
      resizable: false,
      flex: 0,
      cellStyle: { justifyContent: 'center', textAlign: 'center', padding: 0, fontSize: 10, color: 'grey' },
      valueGetter: (params) => params.node ? params.node.rowIndex + 1 : null,
      // cellRenderer: RowNumRenderer
    },
    {
      field: 'description',
      headerName: 'Description',
      headerComponent: DescriptionHeader,
      headerComponentParams: { index, itemRef },
      wrapHeaderText: true,
      autoHeaderHeight: true,
      width: 250,
      minWidth: 250,
      wrapText: true,
      autoHeight: true,
      flex: 2,
      cellStyle: { justifyContent: 'center', textAlign: 'center' }
    },
    {
      field: 'item',
      headerName: 'Item',
      width: 200,
      minWidth: 200,
      wrapText: true,
      autoHeight: true,
      cellStyle: { justifyContent: 'center', textAlign: 'center' }
    },
    {
      field: 'qty',
      headerName: 'Qty',
      cellStyle: { justifyContent: 'center' }
    },
    {
      field: 'price',
      headerName: 'Price',
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
