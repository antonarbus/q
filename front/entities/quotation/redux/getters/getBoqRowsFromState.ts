import type { Quotation, Row } from '../../types'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqRowsFromState = ({
  blockIndex,
  state,
}: Props): Row[] | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })
  if (boqBlock === undefined) return
  const boqRows = boqBlock.boq.rows
  return boqRows
}
