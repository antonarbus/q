import { boqRowCellKey } from '@entities/quotation'
import { formatRowBlockCellNumber } from '@entities/quotation/utils/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
}

export const formatQtyCell = ({ qtyCellEditorRef }: Props): void => {
  formatRowBlockCellNumber({
    boqRowCellKey: boqRowCellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
