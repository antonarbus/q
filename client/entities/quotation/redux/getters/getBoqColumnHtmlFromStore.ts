import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqColumnKey } from '../../types'
type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqColumnHtmlFromStore = ({ itemIndex, boqColumnKey }: Props): string => {
  const item = getState().quotation.items[itemIndex]

  if (!item) return ''
  if (item.type !== itemKey.boq) return ''

  const html = item.boq.column[boqColumnKey].html
  return html
}
