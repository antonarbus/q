import { cellKey } from '@entities/quotation/const/cellKey'
import { formatRowBlockCellNumber } from '@entities/quotation/util/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
}

export const formatItemPriceCell = ({
  itemPriceCellEditorRef,
}: Props): void => {
  formatRowBlockCellNumber({
    cellKey: cellKey.itemPrice,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
