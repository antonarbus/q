import type { RootState } from '@shared/lib/redux'
import { getRowsFromStore } from '../getter/getRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectIsLastRow =
  ({ blockIndex }: Props) =>
  (state: RootState): boolean => {
    const boqRows = getRowsFromStore({ blockIndex })

    if (boqRows === undefined) {
      return false
    }

    const isBoqRowAlone = boqRows.length === 1

    return isBoqRowAlone
  }
