import type { Quotation, Cell, CellKey } from '@back/entities/quotation/schema'
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
