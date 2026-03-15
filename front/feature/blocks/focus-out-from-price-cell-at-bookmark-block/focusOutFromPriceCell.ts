import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  priceCellEditorRef: EditorRef
}

export const focusOutFromPriceCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'price',
    editorRef: props.priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
