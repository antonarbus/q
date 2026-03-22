import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entity/quotation/schema'
import { getState } from '@front/shared/lib/redux'

type Props = {
  cellKey: CellKey
}

export const getHtmlOfBookmarkedRowCellFromStoreByIndex = (
  props: Props,
): string => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return ''
  }

  const row = block

  const cell = row[props.cellKey]

  return cell.html
}
