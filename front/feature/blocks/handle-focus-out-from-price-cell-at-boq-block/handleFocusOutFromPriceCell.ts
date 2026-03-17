import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleFocusOutFromPriceCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
    editor:
      editorRegistry.get({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'priceCell',
      }) ?? null,
    roundToTwoDecimals: true,
  })
}
