import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import type { Boq } from '../../types'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = ({
  blockIndex,
}: Props): Boq | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return

  return block
}
