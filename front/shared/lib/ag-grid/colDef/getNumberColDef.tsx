import type { ColDef, ColDefField } from 'ag-grid-community'

type Props<
  TData extends Record<string, unknown>,
  TValue extends number = number,
> = ColDef<TData, TValue> & {
  field: ColDefField<TData, TValue>
}

/** Column for number value */
export const getNumberColDef = <
  TData extends Record<string, unknown>,
  TValue extends number = number,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
    colId: props.field,
    cellDataType: 'number',
    filter: 'agNumberColumnFilter',
    ...props,
  }
}
