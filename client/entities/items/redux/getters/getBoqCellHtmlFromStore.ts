import { getState } from '@lib_instances/store'
import { type BoqRowCellKey, type BoqColumnKey } from '../../types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellHtmlFromStore = ({ itemIndex, rowIndex, boqRowCellKey }: Props): string => {
  const item = getState().items[itemIndex]
  if (!item) return ''
  if (item.type !== 'boq') return ''
  const row = item.boq.rows[rowIndex]
  if (row === undefined) return ''
  const html = row[boqRowCellKey].html
  return html
}
