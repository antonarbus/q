import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
}

export const getPriceBlockHtmlFromStore = ({ blockIndex }: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.price) {
    return ''
  }

  const { html } = block.price

  return html
}
