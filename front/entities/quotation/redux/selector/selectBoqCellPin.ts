import type { CellKey } from '@entities/quotation/const/cellKey'
import type { RootState } from '@shared/lib/redux'
import type { RowCellPin } from '../../type'
import { getRowFromStore } from '../getter/getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const selectBoqCellPin =
  ({ blockIndex, rowIndex, cellKey }: Props) =>
  (_state: RootState): RowCellPin | undefined => {
    const boqRow = getRowFromStore({ blockIndex, rowIndex })

    if (boqRow === undefined) {
      return
    }

    const cellPin = boqRow[cellKey].pin

    return cellPin
  }
