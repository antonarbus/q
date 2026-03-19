import type { RowBlock } from '@back/entity/quotation/schema'
import { getBoqBlockFromStoreByIndex } from './getBoqBlockFromStoreByIndex'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const getRowFromStoreByIndex = (props: Props): RowBlock | undefined => {
  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[props.rowIndex]

  return row
}
