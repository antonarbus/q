import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  blockIndex: number
}

export const getPriceBlockHtmlFromStore = ({ blockIndex }: Props): string => {
  const block = getState().quotation.blocks[blockIndex]
  if (block?.type !== itemKey.price) return ''
  const html = block.price.html
  return html
}
