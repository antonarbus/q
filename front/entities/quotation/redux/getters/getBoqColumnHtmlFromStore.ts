import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqColumnKey } from '../../types'
type Props = {
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = ({
  blockIndex,
  boqColumnKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return ''

  const html = block.boq.column[boqColumnKey].html
  return html
}
