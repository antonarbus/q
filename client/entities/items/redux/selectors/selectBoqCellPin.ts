import { type RootState } from '@lib_instances/store'
import type { BoqRowCellKey, BoqRowCellPin } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCellPin =
  ({ itemIndex, rowIndex, boqRowCellKey }: Props) =>
    (state: RootState): BoqRowCellPin | undefined => {
      const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
      if (boqRow === undefined) return
      const boqRowCellPin = boqRow[boqRowCellKey].pin
      return boqRowCellPin
    }
