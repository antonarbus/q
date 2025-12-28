import type { RowBlock } from '@root/shared/types/BlockItem'
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
