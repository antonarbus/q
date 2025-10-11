import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { formatBoqRowCellNumber } from '@entities/quotation/util/formatBoqRowCellNumber'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  blockIndex: number
  rowIndex: number
}

export const formatBoqRowQtyCell = ({
  qtyCellEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    blockIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
