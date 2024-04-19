import { type ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'
import { type ItemCopyable } from '@entities/quotation'

type Props = {
  columnDef: keyof ItemCopyable
}

type Params = ValueGetterParams<ItemCopyable, string>

export const dateValueGetter = ({ columnDef }: Props) => (params: Params): Date | null => {
  const dateIsoString = params.data?.[columnDef]
  if (typeof dateIsoString !== 'string') return null
  const dateObj = new Date(dateIsoString)
  if (!isValid(new Date(dateObj))) return null
  return dateObj
}
