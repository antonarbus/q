import { getState } from '@lib_instances/store'
import { type Block } from '../../types'

type Props = {
  blockIndex: number
}

export const getBlockByIndexFromStore = ({
  blockIndex,
}: Props): Block | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block === undefined) return

  return block
}
