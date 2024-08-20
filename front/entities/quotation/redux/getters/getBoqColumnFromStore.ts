import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import type { Col, ColumnKey } from '../../types'

type Props = {
  blockIndex: number
  boqColumnKey: ColumnKey
}

export const getBoqColumnFromStore = ({
  blockIndex,
  boqColumnKey,
}: Props): Col | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  const column = block.boq.column[boqColumnKey]
  return column
}
