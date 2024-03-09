import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ColDef } from 'ag-grid-community'
import { DeleteQuotationButton } from './DeleteQuotationButton'
import { OpenQuotationButton } from './OpenQuotationButton'

export const defaultColDef: ColDef<QuotationModelType> = {
  headerClass: ['center'],
  width: 170,
  minWidth: 170,
  editable: false,
  filter: 'agTextColumnFilter',
  floatingFilter: true,
  resizable: true,
  sortable: true,
  unSortIcon: true,
  suppressHeaderMenuButton: true,
  flex: 1,
}

export const columnDefs: Array<ColDef<QuotationModelType>> = [
  {
    field: 'open',
    headerName: '',
    cellRenderer: OpenQuotationButton,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    suppressMovable: true,
    lockPosition: 'left',
    pinned: 'left',
    suppressColumnsToolPanel: true,
    suppressNavigable: true,
    cellClass: ['no-focus'],
  },
  {
    field: 'delete',
    headerName: '',
    cellRenderer: DeleteQuotationButton,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    suppressMovable: true,
    lockPosition: 'left',
    pinned: 'left',
    suppressColumnsToolPanel: true,
    suppressNavigable: true,
    cellClass: ['no-focus'],
  },
  {
    field: 'id',
  },
  {
    field: 'version',
  },
  {
    field: 'createdAt',
  },
  {
    field: 'updatedAt',
  },
]
