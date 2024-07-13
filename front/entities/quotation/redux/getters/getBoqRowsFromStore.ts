import { type BoqRow } from '../../types'
import { getBoqItemFromStore } from './getBoqItemFromStore'

type Props = {
  itemIndex: number
}

export const getBoqRowsFromStore = ({
  itemIndex,
}: Props): BoqRow[] | undefined => {
  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return
  const boqRows = boqItem.boq.rows
  return boqRows
}
