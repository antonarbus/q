import { cellKey } from '@entities/quotation/const/cellKey'
import { formatRowBlockCellNumber } from '@entities/quotation/util/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
}

export const formatPriceCell = ({ priceCellEditorRef }: Props): void => {
  formatRowBlockCellNumber({
    cellKey: cellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
