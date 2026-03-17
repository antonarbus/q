import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@entity/quotation/util/getTotalPriceAbove'
import { dispatch, getState } from '@shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'

export const recalculateTotalPrices = (): void => {
  const state = getState()

  state.quotation.blocks.forEach((block, blockIndex) => {
    if (block.type !== 'price') {
      return
    }

    const totalPrice = getTotalPriceAbove({
      blockIndex,
      blocks: state.quotation.blocks,
    })

    const editor =
      editorRegistry.get(
        getRegistryKey({
          editorName: 'priceBlockPrice',
          blockIndex,
          rowIndex: null,
        }),
      ) ?? null

    if (editor === null) {
      return
    }

    const updatedHtml = getStringWithNewFormattedNumber({
      string: block.price.html,
      newNumber: totalPrice,
    })

    dispatch(
      quotationSlice.actions.updatePrice({
        blockIndex,
        html: updatedHtml,
        value: totalPrice,
      }),
    )

    updateNumberAtHtmlIncrementally({
      oldNumber: block.price.value,
      newNumber: totalPrice,
      totalPriceValueEditor: editor,
      html: block.price.html,
    })
  })
}
