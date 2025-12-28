import type { CellKey } from '@entities/quotation/const/cellKey'
import type { Quotation } from '@root/shared/types/Quotation'
import type { Cell } from '@root/shared/types/BlockItem'
import { getRowFromState } from './getRowFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  state: Quotation
}

export const getCellFromState = (props: Props): Cell | undefined => {
  const row = getRowFromState({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    state: props.state,
  })

  if (row === undefined) {
    return
  }

  const cell = row[props.cellKey]

  return cell
}
