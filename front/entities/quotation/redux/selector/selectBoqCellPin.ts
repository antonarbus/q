import type { CellKey } from '@entities/quotation/const/cellKey'
import type { RootState } from '@shared/lib/redux'
import type { RowCellPin } from '../../type'
import { getBoqRowFromStore } from '../getter/getBoqRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, cellKey }: Props) =>
  (_state: RootState): RowCellPin | undefined => {
    const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

    if (boqRow === undefined) {
      return
    }

    const cellPin = boqRow[cellKey].pin

    return cellPin
  }
