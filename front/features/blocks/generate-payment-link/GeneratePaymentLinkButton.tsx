import { useCreatePaymentLinkMutation } from '@front/entities/stripe/api/useCreatePaymentLinkMutation'
import { useStripeAccountStatusQuery } from '@front/entities/stripe/api/useStripeAccountStatusQuery'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import {
  buildSearchParams,
  searchParamValue,
} from '@front/shared/lib/react-router-dom/searchParams'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { routerHolder } from '@front/shared/lib/react-router-dom/routerHolder'
import { route } from '@front/shared/lib/react-router-dom/route'
import { Button } from '@mui/material'
import { toast } from 'sonner'
import { confirmWithDialog } from '@front/shared/component/confirmation-dialog/confirmWithDialog'
import type { AxiosError } from 'axios'
import { selectPaymentBlockByBlockIndex } from '@front/entities/quotation/redux/selector/selectPaymentBlockByBlockIndex'

type Props = {
  amountInput: string
  onInvalidAmount: () => void
}

// todo: lift to widget coz we combine 2 features here
export const GeneratePaymentLinkButton = (props: Props): React.JSX.Element | null => {
  const block = useBlock()
  const stripeStatusQuery = useStripeAccountStatusQuery()
  const createPaymentLinkMutation = useCreatePaymentLinkMutation()
  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

  const paymentBlock = reduxHolder.useSelector(
    selectPaymentBlockByBlockIndex({ blockIndex: block.index }),
  )

  if (paymentBlock?.payment.stripePaymentLinkUrl !== null) {
    return null
  }

  return (
    <Button
      disabled={createPaymentLinkMutation.isPending}
      size='small'
      variant='contained'
      onClick={async (): Promise<void> => {
        if (stripeStatusQuery.data?.connected !== true) {
          if (reduxHolder.getState().user.email === null) {
            routerHolder.router.navigate(
              `./${route.login}${buildSearchParams({
                redirect: `/${route.stripeConnect}`,
                shouldSlide: searchParamValue.shouldSlide,
              })}`,
            )

            return
          }

          routerHolder.router.navigate(`./${route.stripeConnect}`)

          return
        }

        const amountNum = Number.parseFloat(props.amountInput)

        if (Number.isNaN(amountNum) || amountNum <= 0) {
          props.onInvalidAmount()

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

        const isQuotationSaved = quotationId.length > 0 && quotationId !== 'new'

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

        const result = await createPaymentLinkMutation
          .mutateAsync({
            quotationId: reduxHolder.getState().quotation.id,
            amount: Math.round(amountNum * 100),
            currency: paymentBlock.payment.currency.toLowerCase(),
          })
          .catch((error) => {
            const axiosError = error as AxiosError<{ message: string }>
            const serverMessage = axiosError.response?.data?.message
            toast.error(serverMessage ?? 'Failed to generate payment link.')
          })

        if (result === undefined) {
          return
        }

        const updatedPayment = {
          ...paymentBlock.payment,
          amount: Math.round(amountNum * 100),
          currency: paymentBlock.payment.currency.toLowerCase(),
          stripePaymentLinkId: result.paymentLinkId,
          stripePaymentLinkUrl: result.paymentLinkUrl,
        }

        reduxHolder.dispatch(
          quotationSlice.actions.updatePaymentBlock({
            blockIndex: block.index,
            payment: updatedPayment,
          }),
        )

        // todo: another feature, to be combined on widget level
        await saveExistingQuotation().catch(() => {
          toast.error('Failed to save quotation')
        })

        toast.success('Payment link generated and quotation saved')
      }}
    >
      {createPaymentLinkMutation.isPending ? 'Generating...' : 'Generate Payment Link'}
    </Button>
  )
}
