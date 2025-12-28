import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'
import type { HeaderKey, HeaderValue } from '@root/shared/types/BlockItem'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderFromStore = (
  props: Props,
): HeaderValue | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  return block.boq.header[props.boqHeaderKey]
}
