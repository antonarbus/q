import type { ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'
import type { Quotation } from '@entities/quotation'

type Props = {
  columnDef: keyof Quotation
}

type Params = ValueGetterParams<Quotation, string>

export const dateValueGetter =
  ({ columnDef }: Props) =>
  (params: Params): Date | null => {
    const dateIsoString = params.data?.[columnDef]
    if (typeof dateIsoString !== 'string') return null
    const dateObj = new Date(dateIsoString)
    if (!isValid(new Date(dateObj))) return null
    return dateObj
  }
