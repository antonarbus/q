import { getState } from '@shared/lib/redux'
import type { HeaderKey } from '@back/entity/quotation/schema'

type Props = {
  blockIndex: number
  boqHeaderKey: HeaderKey
}

export const getHtmlOfBoqHeaderFromStoreByIndex = (props: Props): string => {
  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
    return ''
  }

  return block.boq.header[props.boqHeaderKey].html
}
