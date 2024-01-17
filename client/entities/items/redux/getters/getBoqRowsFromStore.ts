import { type BoqRow } from '@shared/types'
import { type ItemsState } from '../itemsSlice'
import { getBoqItemFromStore } from './getBoqItemFromStore'

type Props = {
  itemIndex: number
  state?: ItemsState
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
