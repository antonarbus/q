import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqCol, type BoqColumnKey } from '../../types'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnFromStore = ({
  itemIndex,
  boqColumnKey,
}: Props): BoqCol | undefined => {
  const block = getState().quotation.blocks[itemIndex]

  if (block?.type !== itemKey.boq) return

  const column = block.boq.column[boqColumnKey]
  return column
}
