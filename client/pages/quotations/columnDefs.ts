import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ColDef } from 'ag-grid-community'
import { dateValueFormatter } from './dateValueFormatter'
import { dateValueGetter } from './dateValueGetter'
import { DeleteQuotationButton } from './DeleteQuotationButton'
import { LinkRenderer } from './LinkRenderer'
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
    cellRenderer: OpenQuotationButton,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    lockPosition: 'left',
    pinned: 'left',
    suppressColumnsToolPanel: true,
    suppressNavigable: true,
  },
  {
    cellRenderer: DeleteQuotationButton,
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    lockPosition: 'left',
    pinned: 'left',
    suppressColumnsToolPanel: true,
    suppressNavigable: true,
  },
  {
    field: 'id',
    headerName: 'id',
    cellRenderer: LinkRenderer,
  },
  {
    field: 'version',
    headerName: 'version',
  },
  {
    field: 'createdAt',
    headerName: 'created',
    valueGetter: dateValueGetter({ columnDef: 'createdAt' }),
    valueFormatter: dateValueFormatter,
    filter: 'agDateColumnFilter',
    minWidth: 200,
  },
  {
    field: 'updatedAt',
    headerName: 'updated',
    valueGetter: dateValueGetter({ columnDef: 'updatedAt' }),
    valueFormatter: dateValueFormatter,
    filter: 'agDateColumnFilter',
    minWidth: 200,
  },
]
