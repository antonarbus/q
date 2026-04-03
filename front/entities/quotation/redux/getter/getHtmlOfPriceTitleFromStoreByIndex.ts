import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  blockIndex: number
}

export const getHtmlOfPriceTitleFromStoreByIndex = (props: Props): string => {
  const priceBlock = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return ''
  }

  return priceBlock.title.html
}
