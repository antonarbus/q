import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const updatePriceTitleAtPriceBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'priceBlockTitle',
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

  const prevHtml = priceBlock.title.html
  const html = editor.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updatePriceTitle({
      blockIndex: props.blockIndex,
      html,
    }),
  )
}
