import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.itemPrice,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
