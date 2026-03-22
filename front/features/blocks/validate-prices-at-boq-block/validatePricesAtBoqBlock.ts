import { getRowsFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowsFromStoreByIndex'
import { isRowPriceValid } from '@front/entities/quotation/util/isRowPriceValid'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { updateCellWithValue } from '@front/entities/quotation/util/updateCellWithValue'
import { roundTo } from 'round-to'
import { toast } from 'sonner'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const validatePricesAtBoqBlock = (props: Props): void => {
  const rows = getRowsFromStoreByIndex({ blockIndex: props.blockIndex })

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

      recalculateSubTotalPrices({ incrementally: false })
    }
  })
}
