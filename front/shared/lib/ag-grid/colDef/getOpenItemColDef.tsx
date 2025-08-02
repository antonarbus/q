import type { ColDef, ICellRendererParams } from 'ag-grid-community'

type Props<Item extends Record<string, unknown>> = ColDef<Item> & {
  cellRenderer: (params: ICellRendererParams<Item>) => React.JSX.Element
}

export const getOpenItemColDef = <Item extends Record<string, unknown>>(
  props: Props<Item>,
): ColDef<Item> => {
  return {
    colId: 'openItemColumn',
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    resizable: false,
    suppressMovable: true,
    suppressColumnsToolPanel: true,
    pinned: true,
    cellClass: 'ag-cell-no-focus ag-cell-no-overflow', // custom classes from agGridHeerosStyles.ts
    ...props,
  }
}
