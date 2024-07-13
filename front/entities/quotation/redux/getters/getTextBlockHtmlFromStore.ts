import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  itemIndex: number
}

export const getTextBlockHtmlFromStore = ({ itemIndex }: Props): string => {
  const block = getState().quotation.blocks[itemIndex]

  if (!block) return ''
  if (block.type !== itemKey.text) return ''

  return block.text.html
}
