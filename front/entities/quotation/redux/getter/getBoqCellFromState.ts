import type { CellKey } from '@entities/quotation/const/cellKey'
import type { Quotation, RowCell } from '../../type'
import { getRowFromState } from './getRowFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  state: Quotation
}

export const getBoqCellFromState = ({
  blockIndex,
  rowIndex,
  cellKey,
  state,
}: Props): RowCell | undefined => {
  const row = getRowFromState({ blockIndex, rowIndex, state })

  if (row === undefined) {
    return
  }

  const cell = row[cellKey]

  return cell
}
