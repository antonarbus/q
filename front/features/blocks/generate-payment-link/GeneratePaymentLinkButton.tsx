import { useCreatePaymentLinkMutation } from '@front/entities/stripe/api/useCreatePaymentLinkMutation'
import { useStripeAccountStatusQuery } from '@front/entities/stripe/api/useStripeAccountStatusQuery'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Button } from '@mui/material'
import { toast } from 'sonner'
import type { PaymentBlock } from '@back/entity/quotation/schema'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { route } from '@front/shared/lib/react-router-dom/route'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import type { AxiosError } from 'axios'

export const GeneratePaymentLinkButton = (): React.JSX.Element | null => {
  const block = useBlock()
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const createPaymentLinkMutation = useCreatePaymentLinkMutation()
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

  const stripePaymentLinkUrl = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.stripePaymentLinkUrl
    }

    return null
  })

  const amountInput = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type !== 'payment') {
      return ''
    }

    if (thisBlock.payment.amountInput === '' && thisBlock.payment.amount > 0) {
      return String(thisBlock.payment.amount / 100)
    }

    return thisBlock.payment.amountInput
  })

  const currency = reduxHolder.useSelector((state) => {
    const thisBlock = state.quotation.blocks[block.index]

    if (thisBlock?.type === 'payment') {
      return thisBlock.payment.currency
    }

    return 'usd'
  })

  const isQuotationSaved = quotationId.length > 0 && quotationId !== 'new'

  if (stripePaymentLinkUrl !== null) {
    return null
  }

  return (
    <Button
      disabled={createPaymentLinkMutation.isPending}
      size='small'
      variant='contained'
      onClick={async (): Promise<void> => {
        if (stripeStatusQuery.data?.connected !== true) {
          routerHolder.router.navigate(`./${route.stripeConnect}`)

          return
        }

        const amountNum = Number.parseFloat(amountInput)

        if (Number.isNaN(amountNum) || amountNum <= 0) {
          reduxHolder.dispatch(
            quotationSlice.actions.setPaymentAmountError({ blockIndex: block.index }),
          )

          return
        }

        const { blocks } = reduxHolder.getState().quotation

        const quotationTotal = blocks.reduce((sum, thisBlock) => {
          if (thisBlock.type === 'boq') {
            return sum + thisBlock.boq.header.subTotalPrice.value
          }

          return sum
        }, 0)

        if (quotationTotal > 0 && Math.abs(quotationTotal - amountNum) > 0.01) {
          const confirmed = await confirmWithDialog({
            title: 'Amount mismatch',
            description: `Payment amount (${amountNum.toFixed(2)}) doesn't match the quotation total (${quotationTotal.toFixed(2)}). Proceed anyway?`,
            confirmButtonText: 'Proceed',
          })

          if (!confirmed) {
            return
          }
        }

        if (!isQuotationSaved) {
          const confirmed = await confirmWithDialog({
            title: 'Save quotation first',
            description: 'The quotation needs to be saved before generating a payment link.',
            confirmButtonText: 'Save & Generate',
          })

          if (!confirmed) {
            return
          }

          await saveExistingQuotation()
        }

        try {
          const savedId = reduxHolder.getState().quotation.id

          const result = await createPaymentLinkMutation.mutateAsync({
            quotationId: savedId,
            amount: Math.round(amountNum * 100),
            currency: currency.toLowerCase(),
          })

          const currentPayment = (
            reduxHolder.getState().quotation.blocks[block.index] as PaymentBlock
          ).payment

          const updatedPayment: PaymentBlock['payment'] = {
            ...currentPayment,
            amount: Math.round(amountNum * 100),
            currency: currency.toLowerCase(),
            stripePaymentLinkId: result.paymentLinkId,
            stripePaymentLinkUrl: result.paymentLinkUrl,
          }

          reduxHolder.dispatch(
            quotationSlice.actions.updatePaymentBlock({
              blockIndex: block.index,
              payment: updatedPayment,
            }),
          )

          await saveExistingQuotation()

          toast.success('Payment link generated and quotation saved')
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>
          const serverMessage = axiosError.response?.data?.message

          toast.error(serverMessage ?? 'Failed to generate payment link.')
        }
      }}
    >
      {createPaymentLinkMutation.isPending ? 'Generating...' : 'Generate Payment Link'}
    </Button>
  )
}
