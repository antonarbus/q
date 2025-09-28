import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'
import type { ReactNode } from 'react'
import type {
  ColDef,
  ColDefField,
  ICellRendererParams,
} from 'ag-grid-community'

type Props<
  TData extends Record<string, unknown>,
  TValue extends string,
> = ColDef<TData, TValue> & {
  field: ColDefField<TData, TValue>
}

/** Column for text. */
export const getTextColDef = <
  TData extends Record<string, unknown>,
  TValue extends string,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
    colId: props.field,
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    cellRenderer: (
      params: ICellRendererParams<TData, TValue>,
    ): ReactNode => {
      type FilterModel = Partial<
        Record<
          ColDefField<TData, TValue>,
          {
            filter: string
            filterType: string
            type: string
          }
        >
      >
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      const filterModel = params.api.getFilterModel() as FilterModel

      const filterValue = filterModel[props.field]?.filter ?? ''

      const text = getTextWithBoldSubStringAsJsx({
        text: params.value ?? '',
        subString: filterValue,
      })

      return <div>{text}</div>
    },
    ...props,
  }
}
