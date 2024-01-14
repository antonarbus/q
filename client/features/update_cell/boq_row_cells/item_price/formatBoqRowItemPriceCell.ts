import { type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { type BoqColumnKey } from 'client/shared/types'
import { formatBoqRowCellNumber } from 'client/features/format_cell'

type Props = {
  itemPriceCellEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

export const formatBoqRowItemPriceCell = ({
  itemPriceCellEditorRef,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): void => {
  formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey,
    editorRef: itemPriceCellEditorRef,
    roundToTwoDecimals: true,
  })
}
