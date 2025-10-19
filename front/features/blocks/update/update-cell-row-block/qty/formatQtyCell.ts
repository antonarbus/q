import { cellKey } from '@entities/quotation/const/cellKey'
import { formatRowBlockCellNumber } from '@entities/quotation/util/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
}

export const formatQtyCell = ({ qtyCellEditorRef }: Props): void => {
  formatRowBlockCellNumber({
    cellKey: cellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
