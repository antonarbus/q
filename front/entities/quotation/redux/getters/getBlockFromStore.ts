import { getState } from '@lib_instances/store'
import { type Item } from '../../types'

type Props = {
  itemIndex: number
}

export const getBlockFromStore = ({ itemIndex }: Props): Item | undefined => {
  const block = getState().quotation.blocks[itemIndex]

  if (block === undefined) return

  return block
}
