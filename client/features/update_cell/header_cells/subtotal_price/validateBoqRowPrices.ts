import { getBoqRowsFromStore, isBoqRowPriceValid, updateBoqRowCellWithValue, updateSubTotalPriceWithValue } from 'client/entities/items'
import { type BoqRow } from 'client/shared/types'
import { notify } from 'client/shared/ui/top_msg'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'

type Props = {
  subTotalPriceEditorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqPriceEditorRefs: Array<{
    current: FroalaEditor | null
  }>
}

export const validateBoqRowPrices = ({
  itemIndex,
  boqPriceEditorRefs,
  subTotalPriceEditorRef,
}: Props): void => {
  const boqRows = getBoqRowsFromStore({ itemIndex })
  if (boqRows === undefined) return

  let didNotifyAboutInvalidPriceOnes = false

  boqRows.forEach((boqRow, rowIndex) => {
    const priceCellEditorRef = boqPriceEditorRefs.at(rowIndex)
    if (priceCellEditorRef === undefined) return
    if (priceCellEditorRef.current === null) return

    const isPriceValid = isBoqRowPriceValid({
      html: priceCellEditorRef.current.html.get(),
      itemIndex,
      rowIndex,
    })

    if (!isPriceValid) {
      if (!didNotifyAboutInvalidPriceOnes) {
        notify({
          msg: 'Impossible to set desired subtotal value. Price was set as close as possible.',
          type: 'info',
        })

        didNotifyAboutInvalidPriceOnes = true
      }

      const newPriceValue = boqRow.qty.value * boqRow.itemPrice.value
      const newPriceValueRounded = roundTo(newPriceValue, 2)

      updateBoqRowCellWithValue({
        boqColumnKey: 'price',
        editor: priceCellEditorRef.current,
        itemIndex,
        rowIndex,
        value: newPriceValueRounded,
      })

      const boqRows = getBoqRowsFromStore({ itemIndex })
      if (boqRows === undefined) return

      const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
        const price = boqRow.price.value
        return accumulator + price
      }, 0)

      const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

      updateSubTotalPriceWithValue({
        itemIndex,
        subTotalPriceEditor: subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
      })
    }
  })
}
