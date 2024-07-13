import { type Quotation, type Item } from '../../types'

type Props = {
  itemIndex: number
  state: Quotation
}

export const getBlockFromState = ({
  itemIndex,
  state,
}: Props): Item | undefined => {
  const block = state.blocks[itemIndex]
  return block
}
