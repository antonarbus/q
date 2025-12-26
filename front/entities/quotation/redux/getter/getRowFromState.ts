import type { Quotation } from '../../types/Quotation'
import type { RowBlock } from '../../types/BlockItem'
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
}: Props): RowBlock | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[rowIndex]

  return row
}
