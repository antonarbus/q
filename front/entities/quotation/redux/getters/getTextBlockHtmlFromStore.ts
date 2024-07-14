import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'

type Props = {
  blockIndex: number
}

export const getTextBlockHtmlFromStore = ({ blockIndex }: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (!block) return ''
  if (block.type !== itemKey.text) return ''

  return block.text.html
}
