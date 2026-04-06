import { useCreatePaymentLinkMutation } from '@front/entities/stripe/api/useCreatePaymentLinkMutation'
import { useStripeAccountStatusQuery } from '@front/entities/stripe/api/useStripeAccountStatusQuery'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Button } from '@mui/material'
import { toast } from 'sonner'
import type { PaymentBlock } from '@back/entity/quotation/schema'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { route } from '@front/shared/lib/react-router-dom/route'

type Props = {
  blockIndex: number
  quotationId: string
  amount: string
  currency: string
  description: string
}

export const GeneratePaymentLinkButton = (props: Props): React.JSX.Element => {
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const createPaymentLinkMutation = useCreatePaymentLinkMutation()
  const isQuotationSaved = props.quotationId.length > 0 && props.quotationId !== 'new'

  return (
    <Button
      disabled={!isQuotationSaved || createPaymentLinkMutation.isPending}
      size='small'
      title={
        isQuotationSaved ? undefined : 'Save the quotation first before generating a payment link'
      }
      variant='contained'
      onClick={async (): Promise<void> => {
        if (stripeStatusQuery.data?.connected !== true) {
          routerHolder.router.navigate(`./${route.stripeConnect}`)

          return
        }

        const amountNum = Number.parseFloat(props.amount)

        if (Number.isNaN(amountNum) || amountNum <= 0) {
          toast.error('Please enter a valid amount')

          return
        }

        if (props.description.trim().length === 0) {
          toast.error('Please enter a description')

          return
        }

        try {
          const result = await createPaymentLinkMutation.mutateAsync({
            quotationId: props.quotationId,
            amount: Math.round(amountNum * 100),
            currency: props.currency.toLowerCase(),
            description: props.description.trim(),
          })

          const updatedPayment: PaymentBlock['payment'] = {
            amount: Math.round(amountNum * 100),
            currency: props.currency.toLowerCase(),
            description: props.description.trim(),
            stripePaymentLinkId: result.paymentLinkId,
            stripePaymentLinkUrl: result.paymentLinkUrl,
          }

          reduxHolder.dispatch(
            quotationSlice.actions.updatePaymentBlock({
              blockIndex: props.blockIndex,
              payment: updatedPayment,
            }),
          )

          await saveExistingQuotation()

          toast.success('Payment link generated and quotation saved')
        } catch {
          toast.error('Failed to generate payment link.')
        }
      }}
    >
      {createPaymentLinkMutation.isPending ? 'Generating...' : 'Generate Payment Link'}
    </Button>
  )
}
