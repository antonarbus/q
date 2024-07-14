import { type BoqRow } from '../../types'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
}

export const getBoqRowsFromStore = ({
  blockIndex,
}: Props): BoqRow[] | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })
  if (boqBlock === undefined) return
  const boqRows = boqBlock.boq.rows
  return boqRows
}
