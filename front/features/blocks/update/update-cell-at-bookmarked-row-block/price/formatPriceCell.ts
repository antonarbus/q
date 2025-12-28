import { cellKey } from '@entities/quotation/const/cellKey'
import { formatBookmarkedRowCellNumber } from '@entities/quotation/util/formatBookmarkedRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
}

export const formatPriceCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: cellKey.price,
    editorRef: props.priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
