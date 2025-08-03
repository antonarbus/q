import type { ColDef } from 'ag-grid-community'

type Props<
  TData extends Record<string, unknown>,
  TValue extends string,
> = ColDef<TData, TValue>

/** Column default settings. */
export const getDefaultColDef = <
  TData extends Record<string, unknown>,
  TValue extends string,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
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
    ...props,
  }
}
