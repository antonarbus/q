import type { BoqBlock, Quotation } from '@back/entities/quotation/schemas'

type Props = {
  blockIndex: number
  state: Quotation
}

export const getBoqBlockFromState = (props: Props): BoqBlock | undefined => {
  const block = props.state.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block
}
