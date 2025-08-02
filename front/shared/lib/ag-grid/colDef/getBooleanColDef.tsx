import type { ColDef, ColDefField } from 'ag-grid-community'

type Props<Item extends Record<string, unknown>> = ColDef<Item> & {
  field: ColDefField<Item>
}

/**
 * Column for boolean value.
 */
export const getBooleanColDef = <Item extends Record<string, unknown>>(
  props: Props<Item>,
): ColDef<Item> => {
  return {
    colId: props.field,
    cellDataType: 'boolean',
    ...props,
  }
}
