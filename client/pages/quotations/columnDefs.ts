import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ColDef } from 'ag-grid-community'

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
  suppressMenu: true,
  flex: 1,
}

export const columnDefs: Array<ColDef<QuotationModelType>> = [
  {
    field: 'id',
  },
  {
    field: 'email',
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
