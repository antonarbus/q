import { RefResizableType } from 'client/types'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './agGridCustom.css'
import { AgGridReact } from 'ag-grid-react'
import { Box } from '@mui/system'
import { useRef } from 'react'

type Props = {
  index: number
  itemRef: RefResizableType
}

const defaultColDef = {
  width: 150,
  minWidth: 150,
  editable: false,
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  floatingFilterComponentParams: { suppressFilterButton: false },
  resizable: true,
  sortable: true,
  unSortIcon: true,
  suppressMenu: true,
  flex: 1
}

const columnDefs = [
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
    flex: 2,
    cellStyle: { justifyContent: 'center', textAlign: 'center' }
  },
  {
    field: 'value.name',
    headerName: 'Name',
    width: 250,
    minWidth: 250,
    wrapText: true,
    autoHeight: true,
    flex: 2,
    cellStyle: { justifyContent: 'center', textAlign: 'center' }
  },
  {
    field: 'value.businessId',
    headerName: 'Business ID',
    width: 200,
    minWidth: 200,
    wrapText: true,
    autoHeight: true,
    cellStyle: { justifyContent: 'center', textAlign: 'center' }
  },
  {
    field: 'value.tt',
    headerName: 'TT',
    cellStyle: { justifyContent: 'center' }
  },
  {
    field: 'value.la',
    headerName: 'LA',
    cellStyle: { justifyContent: 'center' }
  },
  {
    field: 'value.mode',
    headerName: 'Mode',
    cellStyle: { justifyContent: 'center' }
  },
  {
    field: 'database',
    headerName: 'Database',
    filter: false,
    floatingFilter: false,
    cellStyle: { justifyContent: 'center' }
  }
]

const rowData = [
  { database: 'NL', value: { tt: '29010', businessId: 'NLRUTABAGA', name: 'Ruta Baga', mode: 'EXPRESS', la: '00059' }, email: '29010.00059@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '29010', businessId: 'NLCONFLICTRUTABAGA', name: 'Conflicting Ruta Baga', mode: 'EXPRESS', la: '00060' }, email: '29010.00060@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '80001', businessId: null, name: 'Heeros Nederland B.V.', mode: 'EXPRESS', la: '00230' }, email: '8000100230@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '80001', businessId: null, name: 'Heeros Nederland B.V.', mode: 'EXPRESS', la: '00235' }, email: '8000100235@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '80015', businessId: 'NL821208317B01', name: 'Fab B.V.', mode: 'EXPRESS', la: '00024' }, email: '80015.00024@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { mode: 'EXPRESS', tt: '88001', businessId: '12345', name: 'Dev unit 4', la: '00397' }, email: '88001.00397@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '88014', businessId: null, name: 'Heeros Nederland B.V.', mode: 'EXPRESS', la: '00029' }, email: '88014.00029@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '00000', businessId: '0427225-7', name: 'JUST A TEST', la: '00000' }, email: 'chinchinclub@heeros-invoices-nl.com' },
  { database: 'NL', value: { mode: 'EXPRESS', tt: '29010', businessId: '999999', name: 'Douwe Egberts', la: '00002' }, email: 'de@heeros-cloudreader-dev.com' },
  { database: 'NL', value: { tt: '88014', businessId: 'NL821208317B01', name: 'Dev Test 2', mode: 'EXPRESS', la: '00007' }, email: 'devtest2@heeros.com' },
  { database: 'NL', value: { mode: 'SERVICE', tt: '88014', businessId: '0427225-7', name: 'No way!', la: '00004' }, email: 'kake@heeros-cloudreader-dev.com' }
]

export const BoqTable = ({ index, itemRef }: Props) => {
  const gridRef = useRef(null)

  return (
    <div
      className='ag-theme-alpine'
      css={{ position: 'relative', overflow: 'visible' }}
    >
      <AgGridReact
        domLayout='autoHeight'
        ref={gridRef}
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
        // loadingOverlayComponent={LoadingOverlay}
        // onFirstDataRendered={showReceiversAmount}
        // onModelUpdated={showReceiversAmount}
        // onFilterChanged={showReceiversAmount}
        // onGridReady={() => setIsTableReady(true)}
      />
    </div>
  )
}
