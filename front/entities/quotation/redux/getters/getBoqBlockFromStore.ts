import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqBlock } from '../../types'

type Props = {
  itemIndex: number
}

export const getBoqBlockFromStore = ({
  itemIndex,
}: Props): BoqBlock | undefined => {
  const block = getState().quotation.blocks[itemIndex]

  if (block?.type !== itemKey.boq) return

  return block
}
