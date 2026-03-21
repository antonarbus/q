import { formatCellNumber } from '@entity/quotation/util/formatCellNumber'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const formatItemPriceCellAtBoqBlock = (props: Props): void => {
  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'itemPrice',
    editor:
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
        }),
      ) ?? null,
    roundToTwoDecimals: true,
  })
}
