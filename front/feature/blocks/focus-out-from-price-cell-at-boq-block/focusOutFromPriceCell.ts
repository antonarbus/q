import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  priceCellEditorRef: EditorRef
  blockIndex: number
  rowIndex: number
}

export const focusOutFromPriceCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
    editorRef: props.priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
