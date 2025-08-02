import type {
  ColDef,
  ColDefField,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

type Props<Item extends Record<string, unknown>> = ColDef<Item> & {
  field: ColDefField<Item>
  withTime?: boolean
}

/**
 * Column for displaying and filtering date and time.
 * The value is expected to be a string in the format "YYYY-MM-DDTHH:mm:ss.SSSZ".
 */
export const getDateColDef = <Item extends Record<string, unknown>>(
  props: Props<Item>,
): ColDef<Item> => {
  return {
    colId: props.field,
    cellDataType: 'dateString',
    filter: 'agDateColumnFilter',
    filterParams: {
      inRangeInclusive: true,
      comparator: (
        filterLocalDateAtMidnight: Date,
        cellValue: Date,
      ): number => {
        const cellDate = new Date(cellValue)
        const filterDate = new Date(filterLocalDateAtMidnight)

        cellDate.setHours(0, 0, 0, 0)
        filterDate.setHours(0, 0, 0, 0)

        return cellDate.getTime() - filterDate.getTime()
      },
    },
    valueGetter: (params: ValueGetterParams<Item>): Date | undefined => {
      const fieldString = props.field.toString()
      if (typeof params.data?.[fieldString] === 'string') {
        const value = params.data[fieldString]
        return new Date(value)
      }
      return undefined
    },
    valueFormatter: (
      params: ValueFormatterParams<Item, Date | undefined>,
    ): string => {
      if (params.value instanceof Date) {
        if (props.withTime === true) {
          const formatWithTime = format(params.value, 'dd.MM.yyyy HH:mm:ss', {
            locale: fi,
          })

          return formatWithTime
        }

        const formatWithoutTime = format(params.value, 'dd.MM.yyyy', {
          locale: fi,
        })

        return formatWithoutTime
      }

      return ''
    },
    ...props,
  }
}
