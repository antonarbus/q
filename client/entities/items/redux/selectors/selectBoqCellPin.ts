import { type RootState } from '@lib_instances/store'
import type { BoqColumnKey, BoqRowCellPin } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const selectBoqCellPin =
  ({ itemIndex, rowIndex, boqColumnKey }: Props) =>
    (state: RootState): BoqRowCellPin | undefined => {
      const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
      if (boqRow === undefined) return
      const boqRowCellPin = boqRow[boqColumnKey].pin
      return boqRowCellPin
    }
