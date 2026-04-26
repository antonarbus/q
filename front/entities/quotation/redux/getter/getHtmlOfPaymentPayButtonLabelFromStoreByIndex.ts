import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
}

export const getHtmlOfPaymentPayButtonLabelFromStoreByIndex = (props: Props): string => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'payment') {
    return ''
  }

  return block.payment.payButtonLabel.html
}
