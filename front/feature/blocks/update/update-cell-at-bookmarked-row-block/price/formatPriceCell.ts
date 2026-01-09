import { formatBookmarkedRowCellNumber } from '@entity/quotation/util/formatBookmarkedRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
}

export const formatPriceCell = (props: Props): void => {
  formatBookmarkedRowCellNumber({
    cellKey: 'price',
    editorRef: props.priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
