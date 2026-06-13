import type { Quotation, RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromStateByIndex } from './getBoqBlockFromStateByIndex'

type Props = {
  blockIndex: number
  rowIndex: number
  state: Quotation
}

export const getRowFromStateByIndex = (props: Props): RowBlock | undefined => {
  const boqBlock = getBoqBlockFromStateByIndex({
    blockIndex: props.blockIndex,
    state: props.state,
  })

  if (boqBlock === undefined) {
    return undefined
  }

  const row = boqBlock.boq.rows[props.rowIndex]

  return row
}
