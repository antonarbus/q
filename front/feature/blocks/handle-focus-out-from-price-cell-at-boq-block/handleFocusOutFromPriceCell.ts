import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

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
        getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
        }),
      ) ?? null,
    roundToTwoDecimals: true,
  })
}
