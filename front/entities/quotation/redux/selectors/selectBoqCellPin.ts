import type { RootState } from '@lib_instances/store'
import type { RowCellPin } from '../../types'
import { getBoqRowFromStore } from '../getters/getBoqRowFromStore'
import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): RowCellPin | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })
    if (boqRow === undefined) return
    const boqRowCellPin = boqRow[boqRowCellKey].pin
    return boqRowCellPin
  }
