import { boqRowCellKey } from '@entities/quotation'
import { formatRowBlockCellNumber } from '@entities/quotation/utils/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  itemPriceCellEditorRef: FroalaEditorRef
}

export const formatItemPriceCell = ({
  itemPriceCellEditorRef,
}: Props): void => {
  formatRowBlockCellNumber({
    boqRowCellKey: boqRowCellKey.itemPrice,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
