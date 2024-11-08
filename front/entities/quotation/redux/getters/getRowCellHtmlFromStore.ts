import { getState } from '@shared/lib/redux'
import { itemType } from '../../consts/itemType'
import { bookmarkPosAtBlocks } from '@entities/quotation/consts/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '@entities/quotation/consts/boqRowCellKey'

type Props = {
  boqRowCellKey: BoqRowCellKey
}

export const getRowCellHtmlFromStore = ({ boqRowCellKey }: Props): string => {
  const block = getState().quotation.blocks[bookmarkPosAtBlocks]

  if (block?.type !== itemType.row) return ''

  const row = block

  const html = row[boqRowCellKey].html

  return html
}
