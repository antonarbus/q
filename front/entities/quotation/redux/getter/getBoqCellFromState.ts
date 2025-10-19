import type { CellKey } from '@entities/quotation/const/cellKey'
import type { Quotation, RowCell } from '../../type'
import { getBoqRowFromState } from './getBoqRowFromState'

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
  const boqRow = getBoqRowFromState({ blockIndex, rowIndex, state })

  if (boqRow === undefined) {
    return
  }

  const cell = boqRow[cellKey]

  return cell
}
