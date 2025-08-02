import type { ColDef, ColDefField } from 'ag-grid-community'

type Props<Item extends Record<string, unknown>> = ColDef<Item> & {
  field: ColDefField<Item>
}
/**
 * Column for numbers.
 */
export const getNumberColDef = <Item extends Record<string, unknown>>(
  props: Props<Item>,
): ColDef<Item> => {
  return {
    colId: props.field,
    cellDataType: 'number',
    filter: 'agNumberColumnFilter',
    ...props,
  }
}
