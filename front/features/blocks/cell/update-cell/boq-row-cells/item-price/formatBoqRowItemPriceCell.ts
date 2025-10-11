import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { formatBoqRowCellNumber } from '@entities/quotation/util/formatBoqRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

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
