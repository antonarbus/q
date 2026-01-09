import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
}

export const formatQtyCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'qty',
    editorRef: props.qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
