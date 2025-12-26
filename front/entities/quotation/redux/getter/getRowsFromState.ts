import type { Quotation } from '../../types/Quotation'
import type { RowBlock } from '../../types/BlockItem'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getRowsFromState = ({
  blockIndex,
  state,
}: Props): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return
  }

  const { rows } = boqBlock.boq

  return rows
}
