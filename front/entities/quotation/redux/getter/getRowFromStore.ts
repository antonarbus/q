import type { RowBlock } from '@back/entities/quotation/schema'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const getRowFromStore = (props: Props): RowBlock | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[props.rowIndex]

  return row
}
