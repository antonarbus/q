import type { PaymentBlock } from '@back/entity/quotation/schema'
import type { RootState } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
}

export const selectPaymentBlockByBlockIndex =
  (props: Props) =>
  (state: RootState): PaymentBlock | undefined => {
    const block = state.quotation.blocks[props.blockIndex]

    if (block?.type === 'payment') {
      return block
    }

    return undefined
  }
