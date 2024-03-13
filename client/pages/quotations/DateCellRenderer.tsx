import { Box } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import { format } from 'date-fns'
import type { ReactNode } from 'react'

export const DateCellRenderer = (params: ICellRendererParams<QuotationModelType, Date>): ReactNode => {
  if (params.value === undefined) return null
  if (params.value === null) return null

  const date = format(params.value, 'dd.MM.yyyy')
  const time = format(params.value, 'HH:mm:ss')

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>{date}</Box>
      <Box sx={{ color: 'grey', fontSize: '12px', lineHeight: '12px', textAlign: 'center' }}>{time}</Box>
    </>
  )
}
