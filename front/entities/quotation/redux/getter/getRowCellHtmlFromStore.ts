import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { getState } from '@shared/lib/redux'
import { itemType } from '../../const/itemType'

type Props = {
  boqRowCellKey: BoqRowCellKey
}

export const getRowCellHtmlFromStore = ({ boqRowCellKey }: Props): string => {
  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return ''
  }

  const row = block

  const { html } = row[boqRowCellKey]

  return html
}
