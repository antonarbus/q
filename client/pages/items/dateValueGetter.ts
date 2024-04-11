import { type ItemModelType } from '@server/db/models/itemModel'
import { type ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'

type Props = {
  columnDef: keyof ItemModelType
}

type Params = ValueGetterParams<ItemModelType, string>

export const dateValueGetter = ({ columnDef }: Props) => (params: Params): Date | null => {
  const dateIsoString = params.data?.[columnDef]
  if (typeof dateIsoString !== 'string') return null
  const dateObj = new Date(dateIsoString)
  if (!isValid(new Date(dateObj))) return null
  return dateObj
}
