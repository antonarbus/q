import { type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from 'client/shared/types'
import { formatBoqRowCellNumber } from 'client/features/format_cell'

type Props = {
  qtyCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const formatBoqRowQtyCell = ({
  qtyCellEditorRef,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: true,
  })
}
