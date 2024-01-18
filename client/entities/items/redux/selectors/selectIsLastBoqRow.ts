import { type RootState } from '@lib_instances/store'
import { getBoqRowsFromStore } from '../getters/getBoqRowsFromStore'

type Props = {
  itemIndex: number
}

export const selectIsLastBoqRow =
  ({ itemIndex }: Props) =>
    (state: RootState): boolean => {
      const boqRows = getBoqRowsFromStore({ itemIndex })
      if (boqRows === undefined) return false
      const isBoqRowAlone = boqRows.length === 1
      return isBoqRowAlone
    }
