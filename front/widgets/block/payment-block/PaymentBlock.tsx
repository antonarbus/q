import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { ClientPaymentView } from './ClientPaymentView'
import { OwnerPaymentView } from './OwnerPaymentView'

export const PaymentBlock = (): React.ReactNode => {
  const block = useBlock()
  const isEditorView = useIsEditorView()
  const paidAt = reduxHolder.useSelector((state) => state.quotation.paidAt)
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

  if (block.item.type !== 'payment') {
    return null
  }

  if (isEditorView) {
    return (
      <OwnerPaymentView
        blockIndex={block.index}
        payment={block.item.payment}
        quotationId={quotationId}
      />
    )
  }

  return <ClientPaymentView isPaid={Boolean(paidAt)} payment={block.item.payment} />
}
