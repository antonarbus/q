import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
}

export const getPriceBlockHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'price') {
    return ''
  }

  return block.price.html
}
