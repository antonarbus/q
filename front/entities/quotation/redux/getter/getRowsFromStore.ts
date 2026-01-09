import type { RowBlock } from '@back/entities/quotation/schema'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
}

export const getRowsFromStore = (props: Props): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  return boqBlock.boq.rows
}
