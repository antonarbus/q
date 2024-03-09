import { type QuotationModelType } from '@server/db/models/quotationModel'
import { type ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'

type Props = {
  columnDef: keyof QuotationModelType
}

type Params = ValueGetterParams<QuotationModelType, string>

export const dateValueGetter = ({ columnDef }: Props) => (params: Params): Date | null => {
  const dateIsoString = params.data?.[columnDef]
  if (typeof dateIsoString !== 'string') return null
  const dateObj = new Date(dateIsoString)
  if (!isValid(new Date(dateObj))) return null
  return dateObj
}
