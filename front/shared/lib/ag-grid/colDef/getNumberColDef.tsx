import type { ColDef, ColDefField } from 'ag-grid-community'

type Props<
  TData extends Record<string, unknown>,
  TValue extends string,
> = ColDef<TData, TValue> & {
  field: ColDefField<TData, TValue>
}

/** Column for numbers. */
export const getNumberColDef = <
  TData extends Record<string, unknown>,
  TValue extends string,
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
