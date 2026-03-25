import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
}

export const updateTextBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'textBlock',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'text') {
    return
  }

  const prevHtml = block.text.html
  const html = editor.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updateBlockText({
      blockIndex: props.blockIndex,
      html,
    }),
  )
}
