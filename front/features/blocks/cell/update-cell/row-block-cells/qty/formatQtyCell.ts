import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { formatRowBlockCellNumber } from '@entities/quotation/util/formatRowBlockCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

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
