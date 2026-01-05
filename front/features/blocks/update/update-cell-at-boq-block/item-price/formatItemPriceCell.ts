import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatItemPriceCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    editorRef: props.itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
