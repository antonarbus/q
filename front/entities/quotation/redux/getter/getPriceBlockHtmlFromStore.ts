import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
}

export const getPriceBlockHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.price) {
    return ''
  }

  return block.price.html
}
