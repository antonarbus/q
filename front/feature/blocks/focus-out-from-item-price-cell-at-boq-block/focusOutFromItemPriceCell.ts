import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  itemPriceCellEditorRef: EditorRef
  blockIndex: number
  rowIndex: number
}

export const focusOutFromItemPriceCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    editorRef: props.itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
