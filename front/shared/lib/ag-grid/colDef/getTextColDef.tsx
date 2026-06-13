import { getTextWithBoldSubStringAsJsx } from '@front/shared/util/getTextWithBoldSubStringAsJsx'
import type { ColDef, ColDefField, ICellRendererParams } from 'ag-grid-community'

type Props<TData extends Record<string, unknown>, TValue extends string = string> = ColDef<
  TData,
  TValue
> & {
  field: ColDefField<TData, TValue>
}

/** Column for text value. */
export const getTextColDef = <
  TData extends Record<string, unknown>,
  TValue extends string = string,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
    colId: props.field,
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    floatingFilterComponentParams: {
      filterPlaceholder: 'Search...',
    },
    cellRenderer: (params: ICellRendererParams<TData, TValue>): React.ReactNode => {
      const filterEntry: unknown = params.api.getFilterModel()[props.field]

      const filterValue =
        typeof filterEntry === 'object' &&
        filterEntry !== null &&
        'filter' in filterEntry &&
        typeof filterEntry.filter === 'string'
          ? filterEntry.filter
          : ''

      const text = getTextWithBoldSubStringAsJsx({
        text: params.value ?? '',
        subString: filterValue,
      })

      return (
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </div>
      )
    },
    ...props,
  }
}
