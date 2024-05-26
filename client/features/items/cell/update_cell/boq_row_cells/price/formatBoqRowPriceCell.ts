import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
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
