import type { ValueGetterParams } from 'ag-grid-community'
import { isValid } from 'date-fns'

type Props<ColumnKeys> = {
  columnDef: keyof ColumnKeys
}

export const dateValueGetter =
  <ColumnKeys>({ columnDef }: Props<ColumnKeys>) =>
  (params: ValueGetterParams<ColumnKeys, string>): Date | null => {
    const dateIsoString = params.data?.[columnDef]

    if (typeof dateIsoString !== 'string') {
      return null
    }

    const dateObj = new Date(dateIsoString)

    if (isValid(new Date(dateObj)) === false) {
      return null
    }

    return dateObj
  }
