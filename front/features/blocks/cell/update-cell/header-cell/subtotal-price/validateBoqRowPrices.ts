import {
  boqRowCellKey,
  getBoqRowsFromStore,
  isBoqRowPriceValid,
  type Row,
  type RowEditorRefs,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
} from '@entities/quotation'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'
import { toast } from 'sonner'

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

  if (boqRows === undefined) {
    return
  }

  let didNotifyAboutInvalidPriceOnes = false

  boqRows.forEach((boqRow, rowIndex) => {
    const priceCellEditorRef = boqRowEditorRefs.at(rowIndex)

    if (priceCellEditorRef === undefined) {
      return
    }

    if (priceCellEditorRef.price.current === null) {
      return
    }

    const isPriceValid = isBoqRowPriceValid({
      html: priceCellEditorRef.price.current.html.get(),
      blockIndex,
      rowIndex,
    })

    if (isPriceValid === false) {
      if (didNotifyAboutInvalidPriceOnes === false) {
        toast.info(
          'Impossible to set exact price. Did it as close as possible.',
        )

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
        incrementally: false,
      })
    }
  })
}
