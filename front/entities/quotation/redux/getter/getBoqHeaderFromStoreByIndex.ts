import { reduxHolder } from '@front/shared/lib/redux'
import type { HeaderKey, HeaderValue } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderFromStoreByIndex = (
  props: Props,
): HeaderValue | undefined => {
  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block.boq.header[props.boqHeaderKey]
}
