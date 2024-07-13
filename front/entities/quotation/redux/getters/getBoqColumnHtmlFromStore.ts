import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqColumnKey } from '../../types'
type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = ({
  itemIndex,
  boqColumnKey,
}: Props): string => {
  const block = getState().quotation.blocks[itemIndex]

  if (block?.type !== itemKey.boq) return ''

  const html = block.boq.column[boqColumnKey].html
  return html
}
