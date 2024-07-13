import { type Row } from '../../types'
import { getBoqItemFromStore } from './getBoqItemFromStore'

type Props = {
  itemIndex: number
}

export const getBoqRowsFromStore = ({
  itemIndex,
}: Props): Row[] | undefined => {
  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return
  const boqRows = boqItem.boq.rows
  return boqRows
}
