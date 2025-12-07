import type { Quotation, Row } from '../../type'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getRowsFromState = ({
  blockIndex,
  state,
}: Props): Row[] | undefined => {
  const boqBlock = getBoqBlockFromState({ blockIndex, state })

  if (boqBlock === undefined) {
    return
  }

  const { rows } = boqBlock.boq

  return rows
}
