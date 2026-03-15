import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  qtyCellEditorRef: EditorRef
  blockIndex: number
  rowIndex: number
}

export const focusOutFromQtyCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
    editorRef: props.qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
