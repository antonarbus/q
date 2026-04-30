import { copySlice } from '@front/entities/copy/copySlice'
import type { PaymentBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import paymentBlockPreviewHtml from '@front/entities/quotation/templates/paymentBlockPreview.html?raw'
import paymentHeadingHtml from '@front/entities/quotation/templates/paymentHeading.html?raw'
import payButtonLabelHtml from '@front/entities/quotation/templates/payButtonLabel.html?raw'

export const copyPaymentBlockTemplate = (event?: React.MouseEvent): void => {
  const paymentBlockTemplate: PaymentBlock = {
    id: generateId(),
    bookmarkSchemaVersion: 2,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'payment',
    email: 'unknown@gmail.com',
    width: 400,
    height: 200,
    payment: {
      amount: 0,
      currency: 'usd',
      heading: { html: paymentHeadingHtml },
      payButtonLabel: { html: payButtonLabelHtml },
      stripePaymentLinkId: null,
      stripePaymentLinkUrl: null,
      amountInput: '',
      amountError: false,
    },
  }

  reduxHolder.dispatch(
    copySlice.actions.addItem({
      item: paymentBlockTemplate,
      preview: paymentBlockPreviewHtml,
    }),
  )

  const isCopyModalVisible = reduxHolder.getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    reduxHolder.dispatch(
      copySlice.actions.setInitCursorPos({
        x: event.clientX,
        y: event.clientY,
      }),
    )

    reduxHolder.dispatch(copySlice.actions.showCopyModal())
  }
}
