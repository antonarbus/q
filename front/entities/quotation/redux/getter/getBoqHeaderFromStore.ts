import { getState } from '@shared/lib/redux'
import type { HeaderKey, HeaderValue } from '@back/entities/quotation/schemas'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getBoqHeaderFromStore = (
  props: Props,
): HeaderValue | undefined => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return
  }

  return block.boq.header[props.boqHeaderKey]
}
