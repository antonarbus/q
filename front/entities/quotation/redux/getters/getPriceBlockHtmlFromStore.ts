import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  itemIndex: number
}

export const getPriceBlockHtmlFromStore = ({ itemIndex }: Props): string => {
  const block = getState().quotation.blocks[itemIndex]
  if (block?.type !== itemKey.price) return ''
  const html = block.price.html
  return html
}
