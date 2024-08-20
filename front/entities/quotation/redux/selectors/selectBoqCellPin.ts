import type { RootState } from '@lib_instances/store'
import type { RowCellKey, RowCellPin } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: RowCellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): RowCellPin | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
    if (boqRow === undefined) return
    const boqRowCellPin = boqRow[boqRowCellKey].pin
    return boqRowCellPin
  }
