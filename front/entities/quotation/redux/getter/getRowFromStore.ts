import type { Row } from '../../type'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const getRowFromStore = ({
  blockIndex,
  rowIndex,
}: Props): Row | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const row = boqBlock.boq.rows[rowIndex]

  return row
}
