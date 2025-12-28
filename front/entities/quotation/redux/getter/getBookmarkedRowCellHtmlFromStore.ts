import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey } from '@entities/quotation/const/cellKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  cellKey: CellKey
}

export const getBookmarkedRowCellHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return ''
  }

  const row = block

  const cell = row[props.cellKey]

  return cell.html
}
