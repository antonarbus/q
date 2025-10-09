import { Box } from '@mui/material'
import type {
  ColDef,
  ColDefField,
  ICellRendererParams,
} from 'ag-grid-community'
import { format, isValid } from 'date-fns'
import type { ReactNode } from 'react'

type Props<
  TData extends Record<string, unknown>,
  TValue extends string,
> = ColDef<TData, TValue> & {
  field: ColDefField<TData, TValue>
}

/** Column for date. */
export const getDateColDef = <
  TData extends Record<string, unknown>,
  TValue extends string,
>(
  props: Props<TData, TValue>,
): ColDef<TData, TValue> => {
  return {
    colId: props.field,
    cellDataType: 'dateString',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    filterParams: {
      comparator: (
        filterLocalDateAtMidnight: Date,
        cellValue: string,
      ): number => {
        const filterLocalDateAtMidnightString =
          filterLocalDateAtMidnight.toISOString()

        if (filterLocalDateAtMidnightString === cellValue) {
          return 0
        }

        if (cellValue < filterLocalDateAtMidnightString) {
          return -1
        }

        if (cellValue > filterLocalDateAtMidnightString) {
          return 1
        }

        return 0
      },
    },
    cellRenderer: (params: ICellRendererParams<TData, TValue>): ReactNode => {
      if (typeof params.value !== 'string') {
        return null
      }

      const dateObj = new Date(params.value)

      if (isValid(new Date(dateObj)) === false) {
        return null
      }

      const date = format(dateObj, 'dd.MM.yyyy')
      const time = format(dateObj, 'HH:mm')

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '12px',
              lineHeight: '12px',
            }}
          >
            {date}
          </Box>
          <Box
            sx={{
              color: 'grey',
              textAlign: 'center',
              fontSize: '10px',
              lineHeight: '10px',
            }}
          >
            {time}
          </Box>
        </Box>
      )
    },
    ...props,
  }
}
