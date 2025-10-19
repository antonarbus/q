import type { Row } from '../../type'
import { getBoqBlockFromStore } from './getBoqBlockFromStore'

type Props = {
  blockIndex: number
}

export const getRowsFromStore = ({ blockIndex }: Props): Row[] | undefined => {
  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const rows = boqBlock.boq.rows

  return rows
}
