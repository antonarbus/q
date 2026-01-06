import { getState } from '@shared/lib/redux'
import type { BlockItem } from '@back/entities/quotation/schemas'

type Props = {
  blockIndex: number
}

export const getBlockFromStore = (props: Props): BlockItem | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block === undefined) {
    return
  }

  return block
}
