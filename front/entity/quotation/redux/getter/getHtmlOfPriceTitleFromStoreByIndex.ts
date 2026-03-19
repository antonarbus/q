import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
}

export const getHtmlOfPriceTitleFromStoreByIndex = (props: Props): string => {
  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return ''
  }

  return priceBlock.title.html
}
