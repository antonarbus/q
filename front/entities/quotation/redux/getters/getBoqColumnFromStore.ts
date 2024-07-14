import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqCol, type BoqColumnKey } from '../../types'

type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = ({
  blockIndex,
  boqColumnKey,
}: Props): BoqCol | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  const column = block.boq.column[boqColumnKey]
  return column
}
