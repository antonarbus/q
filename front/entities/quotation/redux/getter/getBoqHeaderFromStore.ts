import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { HeaderKey, HeaderValue } from '../../types/BlockItem'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderFromStore = ({
  blockIndex,
  boqHeaderKey,
}: Props): HeaderValue | undefined => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block.boq.header[boqHeaderKey]
}
