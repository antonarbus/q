import type { CellKey, Cell } from '@back/entity/quotation/schema'
import { getRowFromStoreByIndex } from './getRowFromStoreByIndex'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

export const getCellFromStoreByIndex = (props: Props): Cell | undefined => {
  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return undefined
  }

  const cell = row[props.cellKey]

  return cell
}
