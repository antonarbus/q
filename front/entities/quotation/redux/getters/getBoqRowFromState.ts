import type { Quotation, BoqRow } from '../../types'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  state: Quotation
}

export const getBoqRowFromState = ({
  blockIndex,
  rowIndex,
  state,
}: Props): BoqRow | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (!boqBlock) return

  const boqRow = boqBlock.boq.rows[rowIndex]

  return boqRow
}
