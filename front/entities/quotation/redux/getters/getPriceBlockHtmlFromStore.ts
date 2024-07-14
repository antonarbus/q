import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'

type Props = {
  blockIndex: number
}

export const getPriceBlockHtmlFromStore = ({ blockIndex }: Props): string => {
  const block = getState().quotation.blocks[blockIndex]
  if (block?.type !== itemType.price) return ''
  const html = block.price.html
  return html
}
