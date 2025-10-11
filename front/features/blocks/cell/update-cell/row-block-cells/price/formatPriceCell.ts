import { boqRowCellKey } from '@entities/quotation'
import { formatRowBlockCellNumber } from '@entities/quotation/util/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

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
