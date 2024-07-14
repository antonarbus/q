import { type RootState } from '@lib_instances/store'
import type { BoqRowCellKey, BoqRowCellPin } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): BoqRowCellPin | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
    if (boqRow === undefined) return
    const boqRowCellPin = boqRow[boqRowCellKey].pin
    return boqRowCellPin
  }
