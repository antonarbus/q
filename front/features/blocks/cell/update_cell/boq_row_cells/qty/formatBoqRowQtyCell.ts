import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatBoqRowQtyCell = ({
  qtyCellEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
