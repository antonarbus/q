import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ValueFormatterParams } from 'ag-grid-community'
import { format } from 'date-fns'

export const dateValueFormatter = (params: ValueFormatterParams<QuotationModelType>): string => {
  const dateObj = params.value
  if (!(dateObj instanceof Date)) return ''
  const dateLocaleFormatted = format(dateObj, 'dd.MM.yyyy')
  return dateLocaleFormatted
}
