import { getState } from '@shared/lib/redux'
import { itemType } from '../../consts/itemType'

type Props = {
  blockIndex: number
}

export const getTextBlockHtmlFromStore = ({ blockIndex }: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (!block) {
    return ''
  }

  if (block.type !== itemType.text) {
    return ''
  }

  return block.text.html
}
