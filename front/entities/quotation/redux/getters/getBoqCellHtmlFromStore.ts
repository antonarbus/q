import { getState } from '@lib_instances/store'
import { itemKey } from '../../consts/itemKey'
import { type BoqRowCellKey } from '../../types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellHtmlFromStore = ({
  itemIndex,
  rowIndex,
  boqRowCellKey,
}: Props): string => {
  const block = getState().quotation.items[itemIndex]

  if (!block) return ''

  if (block.type !== itemKey.boq) return ''

  // todo: move item for edit modal into a different slice
  // special case for when the item is a row for item edit modal
  // if (block.type === itemKey.boq) {
  const row = block.boq.rows[rowIndex]

  if (row === undefined) return ''

  const html = row[boqRowCellKey].html

  return html
  // }

  // if (block.type === itemKey.row) {
  //   const row = block
  //   if (row === undefined) return ''
  //   const html = row[boqRowCellKey].html
  //   return html
  // }

  // return ''
}
