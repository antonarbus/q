import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqHeaderCell, type BoqHeaderKey } from '../../types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderFromStore = ({
  itemIndex,
  boqHeaderKey,
}: Props): BoqHeaderCell | undefined => {
  const block = getState().quotation.blocks[itemIndex]

  if (block?.type !== itemKey.boq) return

  return block.boq.header[boqHeaderKey]
}
