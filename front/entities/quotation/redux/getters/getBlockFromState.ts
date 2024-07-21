import type { Quotation, Block } from '../../types'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBlockFromState = ({
  blockIndex,
  state,
}: Props): Block | undefined => {
  const block = state.blocks[blockIndex]
  return block
}
