import { roundTo } from 'round-to'
import {
  getBoqRowsFromStore,
  isBoqRowPriceValid,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
  type Row,
  type RowEditorRefs,
  boqRowCellKey,
} from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/types/froala'
import { notify } from '@shared/toast'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: RowEditorRefs
}

export const validateBoqRowPrices = ({
  blockIndex,
  boqRowEditorRefs,
  subTotalPriceEditorRef,
}: Props): void => {
  const boqRows = getBoqRowsFromStore({ blockIndex })
  if (boqRows === undefined) return

  let didNotifyAboutInvalidPriceOnes = false

  boqRows.forEach((boqRow, rowIndex) => {
    const priceCellEditorRef = boqRowEditorRefs.at(rowIndex)
    if (priceCellEditorRef === undefined) return
    if (priceCellEditorRef.price.current === null) return

    const isPriceValid = isBoqRowPriceValid({
      html: priceCellEditorRef.price.current.html.get(),
      blockIndex,
      rowIndex,
    })

    if (!isPriceValid) {
      if (!didNotifyAboutInvalidPriceOnes) {
        notify({
          msg: 'Impossible to set exact price. Did it as close as possible.',
          type: 'info',
        })

        didNotifyAboutInvalidPriceOnes = true
      }

      const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
      const newPriceValueRounded = roundTo(newPriceValue, 2)

      updateBoqRowCellWithValue({
        boqRowCellKey: boqRowCellKey.price,
        editor: priceCellEditorRef.price.current,
        blockIndex,
        rowIndex,
        value: newPriceValueRounded,
      })

      const rows = getBoqRowsFromStore({ blockIndex })
      if (rows === undefined) return

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
        incrementally: false,
      })
    }
  })
}
