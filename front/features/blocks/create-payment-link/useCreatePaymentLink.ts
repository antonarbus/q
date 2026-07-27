import { useCreatePaymentLinkMutation } from '@front/entities/payment/api/useCreatePaymentLinkMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { selectPaymentBlockByBlockIndex } from '@front/entities/quotation/redux/selector/selectPaymentBlockByBlockIndex'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'

type Res = {
  // resolves true once the link is created and the redux store is updated, false if it failed
  refetch: () => Promise<boolean>
  isPending: boolean
}

export const useCreatePaymentLink = (): Res => {
  const block = useBlock()
  const createPaymentLinkMutation = useCreatePaymentLinkMutation()

  const paymentBlock = reduxHolder.useSelector(
    selectPaymentBlockByBlockIndex({ blockIndex: block.index }),
  )

  const createPaymentLink = async (): Promise<boolean> => {
    if (!paymentBlock) {
      return false
    }

    const result = await createPaymentLinkMutation
      .mutateAsync({
        quotationId: reduxHolder.getState().quotation.id,
        amount: paymentBlock.payment.amount,
        currency: paymentBlock.payment.currency.toLowerCase(),
      })
      .catch((error: unknown) => {
        const serverMessage = isAxiosError<{ message: string }>(error)
          ? error.response?.data.message
          : undefined
        toast.error(serverMessage ?? 'Failed to generate payment link.')
      })

    if (result === undefined) {
      return false
    }

    reduxHolder.dispatch(
      quotationSlice.actions.updatePaymentBlock({
        blockIndex: block.index,
        payment: {
          ...paymentBlock.payment,
          stripePaymentLinkId: result.paymentLinkId,
          stripePaymentLinkUrl: result.paymentLinkUrl,
        },
      }),
    )

    return true
  }

  return {
    refetch: createPaymentLink,
    isPending: createPaymentLinkMutation.isPending,
  }
}
