import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
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
  formatBoqRowCellNumber({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
