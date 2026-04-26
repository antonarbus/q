import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

type Props = { blockIndex: number }

export const updatePaymentHeadingAtPaymentBlock = (props: Props): void => {
  const editor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'paymentBlockHeading',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (editor === null) {
    return
  }

  const block = reduxHolder.getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'payment') {
    return
  }

  const html = editor.getHTML()

  if ((block.payment.heading?.html ?? '') === html) {
    return
  }

  reduxHolder.dispatch(
    quotationSlice.actions.updatePaymentHeading({ blockIndex: props.blockIndex, html }),
  )
}
