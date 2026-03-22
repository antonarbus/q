import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@front/entities/quotation/util/getTotalPriceAbove'
import { dispatch, getState } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'
import { updateNumberAtHtmlIncrementally } from '@front/shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'

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
