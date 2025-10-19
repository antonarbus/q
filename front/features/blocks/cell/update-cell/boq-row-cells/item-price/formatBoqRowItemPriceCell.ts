import { cellKey } from '@entities/quotation/const/cellKey'
import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
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
  formatCellNumber({
    blockIndex,
    rowIndex,
    cellKey: cellKey.itemPrice,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
