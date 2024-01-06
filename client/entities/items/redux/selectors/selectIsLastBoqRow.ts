import type { RootState } from 'client/shared/types'
import { getBoqRows } from '../state_getters/getBoqRows'

type Props = {
  itemIndex: number
}

export const selectIsLastBoqRow =
  ({ itemIndex }: Props) =>
    (state: RootState): boolean => {
      const boqRows = getBoqRows({ itemIndex })
      if (boqRows === undefined) return false
      const isBoqRowAlone = boqRows.length === 1
      return isBoqRowAlone
    }
