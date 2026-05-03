import { useCreatePaymentLinkMutation } from '@front/entities/stripe/api/useCreatePaymentLinkMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { selectPaymentBlockByBlockIndex } from '@front/entities/quotation/redux/selector/selectPaymentBlockByBlockIndex'
import { saveExistingQuotation } from '@front/features/quotation/save-quotation/saveExistingQuotation'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'

type Res = {
  refetch: () => Promise<void>
  isPending: boolean
}

export const useCreatePaymentLink = (): Res => {
  const block = useBlock()
  const createPaymentLinkMutation = useCreatePaymentLinkMutation()

  const paymentBlock = reduxHolder.useSelector(
    selectPaymentBlockByBlockIndex({ blockIndex: block.index }),
  )

  const createPaymentLink = async (): Promise<void> => {
    if (!paymentBlock) {
      return
    }

    const result = await createPaymentLinkMutation
      .mutateAsync({
        quotationId: reduxHolder.getState().quotation.id,
        amount: paymentBlock.payment.amount,
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

    await saveExistingQuotation().catch(() => {
      toast.error('Failed to save quotation')
    })

    toast.success('Payment link generated and quotation saved')
  }

  return {
    refetch: createPaymentLink,
    isPending: createPaymentLinkMutation.isPending,
  }
}
