import { getState } from 'client/shared/clients'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const boqCellHtmlGetter = ({ itemIndex, rowIndex, boqColumnKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  const row = item.boq.rows[rowIndex]
  if (row === undefined) return ''
  const html = row[boqColumnKey].html
  return html
}
