import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { HeaderKey } from '../../type'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderHtmlFromStore = ({
  blockIndex,
  boqHeaderKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return ''
  }

  return block.boq.header[boqHeaderKey].html
}
