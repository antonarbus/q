import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqRowCellKey } from '../../types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellHtmlFromStore = ({ itemIndex, rowIndex, boqRowCellKey }: Props): string => {
  const item = getState().quotation[itemIndex]
  if (!item) return ''
  if (item.type !== itemKey.boq) return ''
  const row = item.boq.rows[rowIndex]
  if (row === undefined) return ''
  const html = row[boqRowCellKey].html
  return html
}
