import { type ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'
import { type Item } from '@entities/bookmark'

type Props = {
  columnDef: keyof Item
}

type Params = ValueGetterParams<Item, string>

export const dateValueGetter = ({ columnDef }: Props) => (params: Params): Date | null => {
  const dateIsoString = params.data?.[columnDef]
  if (typeof dateIsoString !== 'string') return null
  const dateObj = new Date(dateIsoString)
  if (!isValid(new Date(dateObj))) return null
  return dateObj
}
