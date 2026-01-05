import type { CellKey, CellPin } from '@back/entities/quotation/quotationSchema'
import type { RootState } from '@shared/lib/redux'
import { getRowFromStore } from '../getter/getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const selectCellPin =
  ({ blockIndex, rowIndex, cellKey }: Props) =>
  (_state: RootState): CellPin | undefined => {
    const row = getRowFromStore({ blockIndex, rowIndex })

    if (row === undefined) {
      return
    }

    const cellPin = row[cellKey].pin

    return cellPin
  }
