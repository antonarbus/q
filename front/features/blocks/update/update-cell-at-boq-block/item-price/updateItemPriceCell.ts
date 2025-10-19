import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowFromStore } from '@entities/quotation/redux/getter/getRowFromStore'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import { updateCellAtStore } from '@entities/quotation/redux/updater/updateCellAtStore'
import type { Row } from '@entities/quotation/type'
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

export const updateItemPriceCell = ({
  itemPriceCellEditorRef,
  priceCellEditorRef,
  subTotalPriceEditorRef,
  blockIndex,
  rowIndex,
}: Props): void => {
  if (itemPriceCellEditorRef.current === null) {
    return
  }

  const didContentChange = didCellContentChange({
    editor: itemPriceCellEditorRef.current,
    blockIndex,
    rowIndex,
    cellKey: cellKey.itemPrice,
  })

  if (didContentChange === false) {
    return
  }

  updateCellAtStore({
    blockIndex,
    rowIndex,
    cellKey: cellKey.itemPrice,
    html: itemPriceCellEditorRef.current.html.get(),
  })

  const row = getRowFromStore({ blockIndex, rowIndex })

  if (row === undefined) {
    return
  }

  const newPriceValue = row.qty.value * row.itemPrice.value
  const newPriceValueRounded = roundTo(newPriceValue, 2)

  updateCellWithValue({
    cellKey: cellKey.price,
    editor: priceCellEditorRef.current,
    blockIndex,
    rowIndex,
    value: newPriceValueRounded,
  })

  const rows = getRowsFromStore({ blockIndex })

  if (rows === undefined) {
    return
  }

  const subTotalPriceValueNew: number = rows.reduce(
    (accumulator: number, row: Row) => {
      const price = row.price.value

      return accumulator + price
    },
    0,
  )

  const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

  updateSubTotalPriceWithValue({
    blockIndex,
    subTotalPriceEditor: subTotalPriceEditorRef.current,
    value: subTotalPriceValueNewRounded,
    incrementally: true,
  })
}
