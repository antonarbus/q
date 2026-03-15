import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  qtyCellEditorRef: EditorRef
}

export const handleFocusOutFromQtyCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'qty',
    editorRef: props.qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
