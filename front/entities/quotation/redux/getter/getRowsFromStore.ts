import type { RowBlock } from '@root/shared/types/BlockItem'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
}

export const getRowsFromStore = ({
  blockIndex,
}: Props): RowBlock[] | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return
  }

  return boqBlock.boq.rows
}
