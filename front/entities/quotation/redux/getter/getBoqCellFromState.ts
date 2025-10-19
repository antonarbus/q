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
  const boqRow = getRowFromState({ blockIndex, rowIndex, state })

  if (boqRow === undefined) {
    return
  }

  const cell = boqRow[cellKey]

  return cell
}
