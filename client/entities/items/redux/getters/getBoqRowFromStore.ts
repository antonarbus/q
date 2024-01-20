import { type Item, type BoqRow } from '../../types'
import { getBoqItemFromStore } from './getBoqItemFromStore'

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
  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return
  const boqRow = boqItem.boq.rows[rowIndex]
  return boqRow
}
