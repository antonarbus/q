import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
