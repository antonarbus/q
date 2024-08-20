import { getState } from '@lib_instances/store'
import { itemType } from '../../consts/itemType'
import type { RowCellKey } from '../../types'
import { bookmarkPosAtBlocks } from '@entities/quotation/consts/bookmarkPosAtBlocks'

type Props = {
  boqRowCellKey: RowCellKey
}

export const getRowCellHtmlFromStore = ({ boqRowCellKey }: Props): string => {
  const block = getState().quotation.blocks[bookmarkPosAtBlocks]

  if (block?.type !== itemType.row) return ''

  const row = block

  const html = row[boqRowCellKey].html

  return html
}
