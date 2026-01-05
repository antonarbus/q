import { formatBookmarkedRowCellNumber } from '@entities/quotation/util/formatBookmarkedRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
}

export const formatItemPriceCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'itemPrice',
    editorRef: props.itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
