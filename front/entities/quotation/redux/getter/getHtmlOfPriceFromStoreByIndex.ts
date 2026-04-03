import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
}

export const getHtmlOfPriceFromStoreByIndex = (props: Props): string => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'price') {
    return ''
  }

  return block.price.html
}
