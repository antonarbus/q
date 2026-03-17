import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import type { RowBlock } from '@back/entity/quotation/schema'
import { isRowPriceValid } from '@entity/quotation/util/isRowPriceValid'
import { updateCellWithValue } from '@entity/quotation/util/updateCellWithValue'
import { updateSubTotalPriceWithValue } from '@entity/quotation/util/updateSubTotalPriceWithValue'
import { roundTo } from 'round-to'
import { toast } from 'sonner'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const validatePrices = (props: Props): void => {
  const rows = getRowsFromStore({ blockIndex: props.blockIndex })

  if (rows === undefined) {
    return
  }

  let didNotifyAboutInvalidPriceOnes = false

  rows.forEach((row, rowIndex) => {
    const priceCellEditor =
      editorRegistry.get(
        getRegistryKey({
          editorName: 'boqBlockPriceCell',
          blockIndex: props.blockIndex,
          rowIndex,
        }),
      ) ?? null

    if (priceCellEditor === null) {
      return
    }

    const isPriceValid = isRowPriceValid({
      html: priceCellEditor.getHTML(),
      blockIndex: props.blockIndex,
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
        cellKey: 'price',
        editor: priceCellEditor,
        blockIndex: props.blockIndex,
        rowIndex,
        value: newPriceValueRounded,
      })

      const boqRows = getRowsFromStore({ blockIndex: props.blockIndex })

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
        blockIndex: props.blockIndex,
        subTotalPriceEditor:
          editorRegistry.get(
            getRegistryKey({
              editorName: 'boqBlockSubTotalPrice',
              blockIndex: props.blockIndex,
              rowIndex: null,
            }),
          ) ?? null,
        value: subTotalPriceValueNewRounded,
        incrementally: false,
      })
    }
  })
}
