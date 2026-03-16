import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

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
      editorRegistry.get(
        rowEditorKey({
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
          cellKey: 'price',
        }),
      ) ?? null,
    roundToTwoDecimals: true,
  })
}
