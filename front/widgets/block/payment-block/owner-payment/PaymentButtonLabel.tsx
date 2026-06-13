import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfPaymentPayButtonLabelFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPaymentPayButtonLabelFromStoreByIndex'
import { updatePaymentPayButtonLabelAtPaymentBlock } from '@front/features/blocks/update-payment-pay-button-label/updatePaymentPayButtonLabelAtPaymentBlock'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import type { FC } from 'react'

export const PaymentButtonLabel: FC = () => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'paymentBlockPayButtonLabel',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={true}
      className='payment-pay-button-label'
      placeholder='Pay Now...'
      contentGetter={() =>
        getHtmlOfPaymentPayButtonLabelFromStoreByIndex({ blockIndex: block.index })
      }
      onChange={() => {
        updatePaymentPayButtonLabelAtPaymentBlock({ blockIndex: block.index })
      }}
      sx={{
        width: '100%',
      }}
    />
  )
}
