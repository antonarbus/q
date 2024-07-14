import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqHeaderCell, type BoqHeaderKey } from '../../types'

type Props = {
  blockIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderFromStore = ({
  blockIndex,
  boqHeaderKey,
}: Props): BoqHeaderCell | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  return block.boq.header[boqHeaderKey]
}
