import type { ColDef, ColDefField } from 'ag-grid-community'

type Props<
  TData extends Record<string, unknown>,
  TValue extends boolean = boolean,
> = ColDef<TData, TValue> & {
  field: ColDefField<TData, TValue>
}

/** Column for boolean value. */
export const getBooleanColDef = <
  TData extends Record<string, unknown>,
  TValue extends boolean = boolean,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
    colId: props.field,
    cellDataType: 'boolean',
    ...props,
  }
}
