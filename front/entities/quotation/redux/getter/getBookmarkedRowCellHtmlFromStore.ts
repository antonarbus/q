import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entities/quotation/schemas'
import { getState } from '@shared/lib/redux'

type Props = {
  cellKey: CellKey
}

export const getBookmarkedRowCellHtmlFromStore = (props: Props): string => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return ''
  }

  const row = block

  const cell = row[props.cellKey]

  return cell.html
}
