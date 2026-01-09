import { getState } from '@shared/lib/redux'
import type { BoqBlock } from '@back/entities/quotation/schema'

type Props = {
  blockIndex: number
}

export const getBoqBlockFromStore = (props: Props): BoqBlock | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block
}
