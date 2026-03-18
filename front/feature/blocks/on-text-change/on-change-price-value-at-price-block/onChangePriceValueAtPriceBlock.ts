import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch, getState } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const onChangePriceValueAtPriceBlock = (props: Props): void => {
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

  const priceBlock = getState().quotation.blocks[props.blockIndex]

  if (priceBlock?.type !== 'price') {
    return
  }

  const prevHtml = priceBlock.price.html
  const html = editor.getHTML()
  const didHtmlChange = prevHtml !== html

  if (didHtmlChange === false) {
    return
  }

  const cellTextContent = getTextContentFromHtml({ html })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  dispatch(
    quotationSlice.actions.updatePrice({
      blockIndex: props.blockIndex,
      html,
      value: cellValueFromHtml,
    }),
  )
}
