import { type Quotation, type Block } from '../../types'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBlockByIndexFromState = ({
  blockIndex,
  state,
}: Props): Block | undefined => {
  const block = state.blocks[blockIndex]
  return block
}
