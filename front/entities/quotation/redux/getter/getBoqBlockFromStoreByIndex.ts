import { getState } from '@front/shared/lib/redux'
import type { BoqBlock } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStoreByIndex = (
  props: Props,
): BoqBlock | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block
}
