import { cellKey } from '@entities/quotation/const/cellKey'
import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatQtyCell = ({
  qtyCellEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  formatCellNumber({
    blockIndex,
    rowIndex,
    cellKey: cellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
