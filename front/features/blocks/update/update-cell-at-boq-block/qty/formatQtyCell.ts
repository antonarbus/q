import { formatCellNumber } from '@entities/quotation/util/formatCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatQtyCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
    editorRef: props.qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
