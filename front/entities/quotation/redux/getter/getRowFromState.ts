import type { Quotation, Row } from '../../type'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  state: Quotation
}

export const getRowFromState = ({
  blockIndex,
  rowIndex,
  state,
}: Props): Row | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[rowIndex]

  return row
}
