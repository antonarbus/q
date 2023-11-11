import { getState } from 'client/shared/clients'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const boqColumnNameHtmlGetter = ({ itemIndex, boqColumnKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  const html = item.boq.column[boqColumnKey].html
  return html
}
