import type { BoqBlock, Quotation } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromStateByIndex = (props: Props): BoqBlock | undefined => {
  const block = props.state.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block
}
