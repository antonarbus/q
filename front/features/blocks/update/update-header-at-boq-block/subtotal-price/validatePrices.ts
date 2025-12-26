import { cellKey } from '@entities/quotation/const/cellKey'
import { getRowsFromStore } from '@entities/quotation/redux/getter/getRowsFromStore'
import type {
  RowBlock,
  RowEditorRefs,
} from '@entities/quotation/types/BlockItem'
import { isRowPriceValid } from '@entities/quotation/util/isRowPriceValid'
import { updateCellWithValue } from '@entities/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entities/quotation/util/updateSubTotalPriceWithValue'
import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { roundTo } from 'round-to'
import { toast } from 'sonner'

type Props = {
  blockIndex: number
  subTotalPriceEditorRef: FroalaEditorRef
  rowEditorRefs: RowEditorRefs
}

export const validatePrices = ({
  blockIndex,
  rowEditorRefs,
  subTotalPriceEditorRef,
}: Props): void => {
  const rows = getRowsFromStore({ blockIndex })

  if (rows === undefined) {
    return
  }

  let didNotifyAboutInvalidPriceOnes = false

  rows.forEach((row, rowIndex) => {
    const priceCellEditorRef = rowEditorRefs.at(rowIndex)

    if (priceCellEditorRef === undefined) {
      return
    }

    if (priceCellEditorRef.price.current === null) {
      return
    }

    const isPriceValid = isRowPriceValid({
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

      const newPriceValue = row.qty.value * row.itemPrice.value
      const newPriceValueRounded = roundTo(newPriceValue, 2)

      updateCellWithValue({
        cellKey: cellKey.price,
        editor: priceCellEditorRef.price.current,
        blockIndex,
        rowIndex,
        value: newPriceValueRounded,
      })

      const boqRows = getRowsFromStore({ blockIndex })

      if (boqRows === undefined) {
        return
      }

      const subTotalPriceValueNew: number = boqRows.reduce(
        (accumulator: number, boqRow: RowBlock) => {
          const price = boqRow.price.value

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
