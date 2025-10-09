import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import type { RootState } from '@shared/lib/redux'
import type { RowCellPin } from '../../type'
import { getBoqRowFromStore } from '../getter/getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, boqRowCellKey }: Props) =>
  (state: RootState): RowCellPin | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

    if (boqRow === undefined) {
      return
    }

    const boqRowCellPin = boqRow[boqRowCellKey].pin

    return boqRowCellPin
  }
