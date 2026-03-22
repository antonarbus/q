import type { RootState } from '@front/shared/lib/redux'
import { getRowsFromStoreByIndex } from '../getter/getRowsFromStoreByIndex'

type Props = {
  blockIndex: number
}

export const selectIsLastRow =
  ({ blockIndex }: Props) =>
  (state: RootState): boolean => {
    const rows = getRowsFromStoreByIndex({ blockIndex })

    if (rows === undefined) {
      return false
    }

    const isRowAlone = rows.length === 1

    return isRowAlone
  }
