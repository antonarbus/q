import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { BlockItem } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
}

export const getBlockFromStoreByIndex = (props: Props): BlockItem | undefined => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block === undefined) {
    return
  }

  return block
}
