import type { Quotation, RowBlock } from '@back/entities/quotation/schemas'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getRowsFromState = (props: Props): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromState({
    blockIndex: props.blockIndex,
    state: props.state,
  })

  if (boqBlock === undefined) {
    return
  }

  return boqBlock.boq.rows
}
