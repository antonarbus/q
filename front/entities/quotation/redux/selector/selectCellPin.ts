import type { CellKey, CellPin } from '@back/entity/quotation/schema'
import type { RootState } from '@front/shared/lib/redux/reduxHolder'
import { getRowFromStoreByIndex } from '../getter/getRowFromStoreByIndex'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const selectCellPin =
  ({ blockIndex, rowIndex, cellKey }: Props) =>
  (_state: RootState): CellPin | undefined => {
    const row = getRowFromStoreByIndex({ blockIndex, rowIndex })

    if (row === undefined) {
      return
    }

    const cellPin = row[cellKey].pin

    return cellPin
  }
