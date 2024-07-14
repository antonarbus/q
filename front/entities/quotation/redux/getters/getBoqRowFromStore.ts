import { type Item, type BoqRow } from '../../types'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  state?: Item[]
}

export const getBoqRowFromStore = ({
  blockIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  // const item = getState().quotation.blocks[blockIndex]

  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  // if (item?.type === itemKey.row) {
  //   return item
  // }

  const boqBlock = getBoqBlockFromStore({ blockIndex })
  if (boqBlock === undefined) return
  const boqRow = boqBlock.boq.rows[rowIndex]
  return boqRow
}
