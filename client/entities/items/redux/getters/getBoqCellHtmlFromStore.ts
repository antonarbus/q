import { getState } from '@libras/store'
import { type BoqColumnKey } from '@shared/types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const getBoqCellHtmlFromStore = ({ itemIndex, rowIndex, boqColumnKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  const row = item.boq.rows[rowIndex]
  if (row === undefined) return ''
  const html = row[boqColumnKey].html
  return html
}
