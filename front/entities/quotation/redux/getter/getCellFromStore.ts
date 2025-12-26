import type { CellKey } from '@entities/quotation/const/cellKey'
import type { Cell } from '../../types/BlockItem'
import { getRowFromStore } from './getRowFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getCellFromStore = ({
  blockIndex,
  rowIndex,
  cellKey,
}: Props): Cell | undefined => {
  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const cell = row[cellKey]

  return cell
}
