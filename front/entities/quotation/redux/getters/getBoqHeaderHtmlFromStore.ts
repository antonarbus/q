import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqHeaderKey } from '../../types'

type Props = {
  blockIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderHtmlFromStore = ({
  blockIndex,
  boqHeaderKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemKey.boq) return ''

  return block.boq.header[boqHeaderKey].html
}
