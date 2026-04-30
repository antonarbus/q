import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { getHtmlOfPaymentHeadingFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPaymentHeadingFromStoreByIndex'
import { updatePaymentHeadingAtPaymentBlock } from '@front/features/blocks/update-payment-heading/updatePaymentHeadingAtPaymentBlock'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import type { FC } from 'react'

export const PaymentHeading: FC = () => {
  const block = useBlock()

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'paymentBlockHeading',
        blockIndex: block.index,
        rowIndex: null,
      })}
      isEditorView={true}
      className='payment-heading'
      placeholder='Payment...'
      contentGetter={() => getHtmlOfPaymentHeadingFromStoreByIndex({ blockIndex: block.index })}
      onChange={() => {
        updatePaymentHeadingAtPaymentBlock({ blockIndex: block.index })
      }}
      sx={{
        '.tiptap': {
          padding: '2px 0',
        },
      }}
    />
  )
}
