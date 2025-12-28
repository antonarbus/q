import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  blockIndex: number
}

export const getTextBlockHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block === undefined) {
    return ''
  }

  if (block.type !== itemType.text) {
    return ''
  }

  return block.text.html
}
