import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce } from 'react-use'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useHandlePaymentSuccess = (): void => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlParams = useParams()
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (searchParams.get('payment') !== 'success') {
      return
    }

    setSearchParams({}, { replace: true })
    toast.info('Payment submitted — confirming...')

    // Refetch after 3s to let the Stripe webhook update paidAt in the DB before we read it
    setTimeout(async () => {
      if (urlParams.quotationId === undefined) {
        return
      }

      try {
        const result = await getQuotationMutation.mutateAsync({ id: urlParams.quotationId })

        reduxHolder.dispatch(quotationSlice.actions.loadQuotation({ quotation: result.quotation }))

        if (result.quotation.paidAt === null) {
          toast.warning('Payment received but status is still updating — refresh in a moment.')
        } else {
          toast.success('Payment confirmed!')
        }
      } catch {
        // silent — quotation is already displayed from the initial page load
      }
    }, 3000)
  })
}
