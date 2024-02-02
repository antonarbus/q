import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import { type BoqColumnKey } from '../../types'
type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = ({ itemIndex, boqColumnKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== itemType.boq) return ''
  const html = item.boq.column[boqColumnKey].html
  return html
}
