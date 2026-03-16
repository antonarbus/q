import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleFocusOutFromItemPriceCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    editor:
      editorRegistry.get({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'itemPrice',
      }) ?? null,
    roundToTwoDecimals: true,
  })
}
