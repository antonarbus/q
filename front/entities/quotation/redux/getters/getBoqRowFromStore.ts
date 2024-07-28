import type { Block, BoqRow } from '../../types'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
  state?: Block[]
}

export const getBoqRowFromStore = ({
  blockIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) return

  const boqRow = boqBlock.boq.rows[rowIndex]

  return boqRow
}
