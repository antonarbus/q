import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import type { RowBlock } from '@root/shared/types/BlockItem'
import { didCellContentChange } from '@entities/quotation/util/didCellContentChange'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import type { FroalaEditor } from '@shared/lib/froala/froala'
import type { RefObject } from 'react'
import { roundTo } from 'round-to'

type Props = {
  itemPriceCellEditorRef: RefObject<FroalaEditor | null>
  priceCellEditorRef: RefObject<FroalaEditor | null>
  subTotalPriceEditorRef: RefObject<FroalaEditor | null>
  blockIndex: number
  rowIndex: number
}

export const updateItemPriceCell = (props: Props): void => {
  if (props.itemPriceCellEditorRef.current === null) {
    return
  }

  const didContentChange = didCellContentChange({
    editor: props.itemPriceCellEditorRef.current,
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: cellKey.itemPrice,
  })

  if (didContentChange === false) {
    return
  }

  updateCellAtStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: cellKey.itemPrice,
    html: props.itemPriceCellEditorRef.current.html.get(),
  })

  const row = getRowFromStore({ blockIndex: props.blockIndex, rowIndex: props.rowIndex })

  if (row === undefined) {
    return
  }

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateCellWithValue({
    cellKey: cellKey.price,
    editor: props.priceCellEditorRef.current,
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    value: newPriceValueRounded,
  })

  const rows = getRowsFromStore({ blockIndex: props.blockIndex })

  if (rows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = rows.reduce(
    (accumulator: number, boqRow: RowBlock) => {
      const price = boqRow.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex: props.blockIndex,
    subTotalPriceEditor: props.subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
