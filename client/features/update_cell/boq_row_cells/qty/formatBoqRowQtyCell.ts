import { type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { formatBoqRowCellNumber } from '@entities/items'

type Props = {
  qtyCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowQtyCell = ({
  qtyCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey: 'qty',
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })
}
