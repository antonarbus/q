import { formatCellNumber } from '@front/entities/quotation/util/formatCellNumber'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const formatPriceCellAtBoqBlock = (props: Props): void => {
  const priceCellEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockPriceCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    ) ?? null

  if (priceCellEditor === null) {
    return
  }

  formatCellNumber({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: 'price',
    editor: priceCellEditor,
    roundToTwoDecimals: true,
  })
}
