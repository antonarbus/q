import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { HeaderKey } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getHtmlOfBoqHeaderFromStoreByIndex = (props: Props): string => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return ''
  }

  return block.boq.header[props.boqHeaderKey].html
}
