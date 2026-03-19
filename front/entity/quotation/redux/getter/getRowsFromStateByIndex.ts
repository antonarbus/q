import type { Quotation, RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromStateByIndex } from './getBoqBlockFromStateByIndex'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getRowsFromStateByIndex = (
  props: Props,
): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromStateByIndex({
    blockIndex: props.blockIndex,
    state: props.state,
  })

  if (boqBlock === undefined) {
    return
  }

  return boqBlock.boq.rows
}
