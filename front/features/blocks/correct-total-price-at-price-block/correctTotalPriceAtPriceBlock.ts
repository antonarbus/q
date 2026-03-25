import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { getTotalPriceAbove } from '@front/entities/quotation/util/getTotalPriceAbove'
import { updateNumberAtHtmlIncrementally } from '@front/shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { reduxHolder } from '@front/shared/lib/redux'
import { getNumberFromString } from '@front/shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@front/shared/util/getTextContentFromHtml'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const correctTotalPriceAtPriceBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'priceBlockPrice',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  const priceBlock = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const currentHtml = editor.getHTML()
  const cellTextContent = getTextContentFromHtml({ html: currentHtml })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  const price = getTotalPriceAbove({
    blockIndex: props.blockIndex,
    blocks: reduxHolder.getState().quotation.blocks,
  })

  const shouldCorrectValue = cellValueFromHtml === price

  if (shouldCorrectValue === true) {
    return
  }

  const updatedHtml = getStringWithNewFormattedNumber({
    string: priceBlock.price.html,
    newNumber: price,
  })

  reduxHolder.dispatch(
    quotationSlice.actions.updatePrice({
      blockIndex: props.blockIndex,
      html: updatedHtml,
      value: price,
    }),
  )

  updateNumberAtHtmlIncrementally({
    oldNumber: priceBlock.price.value,
    newNumber: price,
    totalPriceValueEditor: editor,
    html: priceBlock.price.html,
  })
}
