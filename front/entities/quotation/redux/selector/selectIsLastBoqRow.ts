import type { RootState } from '@shared/lib/redux'
import { getBoqRowsFromStore } from '../getter/getBoqRowsFromStore'

type Props = {
  blockIndex: number
}

export const selectIsLastBoqRow =
  ({ blockIndex }: Props) =>
  (state: RootState): boolean => {
    const boqRows = getBoqRowsFromStore({ blockIndex })

    if (boqRows === undefined) {
      return false
    }

    const isBoqRowAlone = boqRows.length === 1

    return isBoqRowAlone
  }
