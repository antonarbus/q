import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

export const getBoqCellHtmlFromStore = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): string => {
  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) return ''

  const row = block.boq.rows[rowIndex]

  if (row === undefined) return ''

  const html = row[boqRowCellKey].html

  return html
}
