import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { formatBoqRowCellNumber, saveItemsLocally } from '@entities/items'

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
  const { didUpdate } = formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqColumnKey: 'qty',
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })

  if (didUpdate) {
    saveItemsLocally({
      msgAboveItemWithIndex: itemIndex,
    })
  }
}
