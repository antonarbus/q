import { type Item, type BoqRow } from '@shared/types'
import { getBoqItemFromStore } from './getBoqItemFromStore'

type Props = {
  itemIndex: number
  state?: Item[]
}

export const getBoqRowsFromStore = ({
  itemIndex,
  state,
}: Props): BoqRow[] | undefined => {
  const boqItem = getBoqItemFromStore({ itemIndex, state })
  if (boqItem === undefined) return
  const boqRows = boqItem.boq.rows
  return boqRows
}
