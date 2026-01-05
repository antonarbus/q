import { getState } from '@shared/lib/redux'

type Props = {
  blockIndex: number
}

export const getTextBlockHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block === undefined) {
    return ''
  }

  if (block.type !== 'text') {
    return ''
  }

  return block.text.html
}
