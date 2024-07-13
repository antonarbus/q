import { type BoqRow } from '../../types'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  itemIndex: number
}

export const getBoqRowsFromStore = ({
  itemIndex,
}: Props): BoqRow[] | undefined => {
  const boqBlock = getBoqBlockFromStore({ itemIndex })
  if (boqBlock === undefined) return
  const boqRows = boqBlock.boq.rows
  return boqRows
}
