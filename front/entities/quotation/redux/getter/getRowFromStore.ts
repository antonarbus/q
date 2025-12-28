import type { RowBlock } from '@root/shared/types/BlockItem'
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
