import { boqRowCellKey } from '@entities/quotation'
import { formatRowBlockCellNumber } from '@entities/quotation/utils/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
}

export const formatPriceCell = ({ priceCellEditorRef }: Props): void => {
  formatRowBlockCellNumber({
    boqRowCellKey: boqRowCellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
