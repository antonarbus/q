import { type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { formatBoqRowCellNumber } from '@entities/items'

type Props = {
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey: 'itemPrice',
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
