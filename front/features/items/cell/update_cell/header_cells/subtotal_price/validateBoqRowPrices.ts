import { roundTo } from 'round-to'
import {
  getBoqRowsFromStore,
  isBoqRowPriceValid,
  updateBoqRowCellWithValue,
  updateSubTotalPriceWithValue,
  type BoqRow,
  type BoqRowEditorRefs,
  boqRowCellKey,
} from '@entities/quotation'
import { type FroalaEditorRef } from '@shared/types/froala'
import { notify } from '@shared/ui/top_msg'

type Props = {
  itemIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: BoqRowEditorRefs
}

export const validateBoqRowPrices = ({
  itemIndex,
  boqRowEditorRefs,
  subTotalPriceEditorRef,
}: Props): void => {
  const boqRows = getBoqRowsFromStore({ itemIndex })
  if (boqRows === undefined) return

  let didNotifyAboutInvalidPriceOnes = false

  boqRows.forEach((boqRow, rowIndex) => {
    const priceCellEditorRef = boqRowEditorRefs.at(rowIndex)
    if (priceCellEditorRef === undefined) return
    if (priceCellEditorRef.price.current === null) return

    const isPriceValid = isBoqRowPriceValid({
      html: priceCellEditorRef.price.current.html.get(),
      itemIndex,
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
        itemIndex,
        rowIndex,
        value: newPriceValueRounded,
      })

      const rows = getBoqRowsFromStore({ itemIndex })
      if (rows === undefined) return

      const subTotalPriceValueNew: number = rows.reduce(
        (accumulator: number, row: BoqRow) => {
          const price = row.price.value
          return accumulator + price
        },
        0,
      )

      const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

      updateSubTotalPriceWithValue({
        itemIndex,
        subTotalPriceEditor: subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
        incrementally: false,
      })
    }
  })
}
