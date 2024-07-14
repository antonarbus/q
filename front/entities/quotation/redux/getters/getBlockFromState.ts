import { type Quotation, type Item } from '../../types'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBlockFromState = ({
  blockIndex,
  state,
}: Props): Item | undefined => {
  const block = state.blocks[blockIndex]
  return block
}
