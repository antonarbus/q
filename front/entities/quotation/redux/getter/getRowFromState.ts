import type { Quotation } from '@root/shared/types/Quotation'
import type { RowBlock } from '@root/shared/types/BlockItem'
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
