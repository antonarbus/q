import { cellKey } from '@entities/quotation/const/cellKey'
import { formatBookmarkedRowCellNumber } from '@entities/quotation/util/formatBookmarkedRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
}

export const formatQtyCell = ({ qtyCellEditorRef }: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: cellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
