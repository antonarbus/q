import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { formatBoqRowCellNumber } from '@entities/items'

type Props = {
  priceCellEditorRef: MutableRefObject<FroalaEditor | null>
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
    boqColumnKey: 'price',
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
