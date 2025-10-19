import type { RootState } from '@shared/lib/redux'
import { getRowsFromStore } from '../getter/getRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectIsLastRow =
  ({ blockIndex }: Props) =>
  (state: RootState): boolean => {
    const rows = getRowsFromStore({ blockIndex })

    if (rows === undefined) {
      return false
    }

    const isRowAlone = rows.length === 1

    return isRowAlone
  }
