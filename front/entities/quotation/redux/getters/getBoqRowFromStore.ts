import { type Item, type BoqRow } from '../../types'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  itemIndex: number
  rowIndex: number
  state?: Item[]
}

export const getBoqRowFromStore = ({
  itemIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  // const item = getState().quotation.blocks[itemIndex]

  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  // if (item?.type === itemKey.row) {
  //   return item
  // }

  const boqBlock = getBoqBlockFromStore({ itemIndex })
  if (boqBlock === undefined) return
  const boqRow = boqBlock.boq.rows[rowIndex]
  return boqRow
}
