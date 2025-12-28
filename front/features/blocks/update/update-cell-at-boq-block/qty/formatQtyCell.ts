import { cellKey } from '@entities/quotation/const/cellKey'
import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatQtyCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: cellKey.qty,
    editorRef: props.qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
