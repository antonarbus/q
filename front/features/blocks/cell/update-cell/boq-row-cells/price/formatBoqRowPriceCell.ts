import { cellKey } from '@entities/quotation/const/cellKey'
import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatBoqRowPriceCell = ({
  priceCellEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  formatCellNumber({
    blockIndex,
    rowIndex,
    cellKey: cellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
