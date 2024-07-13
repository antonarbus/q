import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqHeaderKey } from '../../types'

type Props = {
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

export const getBoqHeaderHtmlFromStore = ({
  itemIndex,
  boqHeaderKey,
}: Props): string => {
  const block = getState().quotation.blocks[itemIndex]

  if (block?.type !== itemKey.boq) return ''

  return block.boq.header[boqHeaderKey].html
}
