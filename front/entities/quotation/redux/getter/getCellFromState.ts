import type { CellKey } from '@entities/quotation/const/cellKey'
import type { Quotation } from '../../types/Quotation'
import type { Cell } from '../../types/BlockItem'
import { getRowFromState } from './getRowFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  state: Quotation
}

export const getCellFromState = ({
  blockIndex,
  rowIndex,
  cellKey,
  state,
}: Props): Cell | undefined => {
  const row = getRowFromState({ blockIndex, rowIndex, state })

  if (row === undefined) {
    return
  }

  const cell = row[cellKey]

  return cell
}
