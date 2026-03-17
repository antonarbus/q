import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const handleFocusOutFromQtyCell = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'qty',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockQtyCell',
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
        }),
      ) ?? null,
    roundToTwoDecimals: false,
  })
}
