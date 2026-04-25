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

  // Read payment directly from Redux so the component re-renders after updatePaymentBlock
  // (the block context is intentionally stale due to arrayShapesEqualityFn in QuotationPage)
  const payment = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment
    }

    return null
  })

  if (block.item.type !== 'payment' || payment === null) {
    return null
  }

  if (isEditorView) {
    return (
      <OwnerPaymentView
        blockIndex={block.index}
        paidAt={paidAt}
        payment={payment}
        quotationId={quotationId}
      />
    )
  }

  return <ClientPaymentView isPaid={Boolean(paidAt)} payment={payment} />
}
