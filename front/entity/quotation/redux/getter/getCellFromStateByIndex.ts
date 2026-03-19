import type { Quotation, Cell, CellKey } from '@back/entity/quotation/schema'
import { getRowFromStateByIndex } from './getRowFromStateByIndex'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  state: Quotation
}

export const getCellFromStateByIndex = (props: Props): Cell | undefined => {
  const row = getRowFromStateByIndex({
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
