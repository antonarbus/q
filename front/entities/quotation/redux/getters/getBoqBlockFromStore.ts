import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqBlock } from '../../types'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = ({
  blockIndex,
}: Props): BoqBlock | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemKey.boq) return

  return block
}
