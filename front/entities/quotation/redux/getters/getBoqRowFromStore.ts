import type { Item, Row } from '../../types'
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
}: Props): Row | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) return

  const boqRow = boqBlock.boq.rows[rowIndex]

  return boqRow
}
