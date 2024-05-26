import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'

type Props = {
  priceCellEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowPriceCell = ({
  priceCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
