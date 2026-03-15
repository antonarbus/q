import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  itemPriceCellEditorRef: EditorRef
}

export const handleFocusOutFromItemPriceCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'itemPrice',
    editorRef: props.itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
