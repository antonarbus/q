import { type ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'
import { type Copyable } from '@entities/item'

type Props = {
  columnDef: keyof Copyable
}

type Params = ValueGetterParams<Copyable, string>

export const dateValueGetter = ({ columnDef }: Props) => (params: Params): Date | null => {
  const dateIsoString = params.data?.[columnDef]
  if (typeof dateIsoString !== 'string') return null
  const dateObj = new Date(dateIsoString)
  if (!isValid(new Date(dateObj))) return null
  return dateObj
}
