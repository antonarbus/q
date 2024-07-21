import type { Quotation, BoqRow } from '../../types'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqRowsFromState = ({
  blockIndex,
  state,
}: Props): BoqRow[] | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })
  if (boqBlock === undefined) return
  const boqRows = boqBlock.boq.rows
  return boqRows
}
