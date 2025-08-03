import { Box } from '@mui/material'
import type {
  ColDef,
  ColDefField,
  ICellRendererParams,
} from 'ag-grid-community'
import { format, isValid } from 'date-fns'

type Props<TData extends Record<string, unknown>> = ColDef<TData> & {
  field: ColDefField<TData>
  withTime?: boolean
}

/** Column for date. */
export const getDateColDef = <TData extends Record<string, unknown>>(
  props: Props<TData>,
): ColDef<TData> => {
  return {
    colId: props.field,
    cellDataType: 'dateString',
    filter: 'agDateColumnFilter',
    minWidth: 200,
    valueGetter: (params): Date | null => {
      const dateIsoString = params.data?.[props.field]

      if (typeof dateIsoString !== 'string') {
        return null
      }

      const dateObj = new Date(dateIsoString)

      if (isValid(new Date(dateObj)) === false) {
        return null
      }

      return dateObj
    },
    cellRenderer: (params: ICellRendererParams<TData>): React.ReactNode => {
      if (typeof params.value !== 'string') {
        return null
      }

      const date = format(params.value, 'dd.MM.yyyy')
      const time = format(params.value, 'HH:mm')

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
    filterParams: {
      comparator: (
        filterLocalDateAtMidnight: Date,
        cellValue: Date,
      ): number => {
        const filterDateString = filterLocalDateAtMidnight.toDateString()
        const cellDateString = cellValue.toDateString()

        if (filterDateString === cellDateString) {
          return 0
        }

        if (cellValue < filterLocalDateAtMidnight) {
          return -1
        }

        if (cellValue > filterLocalDateAtMidnight) {
          return 1
        }

        return 0
      },
    },
    ...props,
  }
}
