import type { Quotation, RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromState } from './getBoqBlockFromState'

type Props = {
  blockIndex: number
  rowIndex: number
  state: Quotation
}

export const getRowFromState = (props: Props): RowBlock | undefined => {
  const boqBlock = getBoqBlockFromState({
    blockIndex: props.blockIndex,
    state: props.state,
  })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[props.rowIndex]

  return row
}
