import {
  getWhoQuotationSharedWithOption,
  quotationSlice,
  useGetQuotationMutation,
  type ShareQuotationFormValues,
} from '@entities/quotation'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  shareQuotationFormValues: ShareQuotationFormValues
}

export const useLoadShareQuotationModalWithDirectLink = ({
  shareQuotationFormValues,
}: Props): void => {
  const { quotationId } = useParams()
  const { mutate: loadQuotation, isSuccess, data } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (quotationId) {
      const quotationIsAlreadyLoaded = getState().quotation.id === quotationId

      if (quotationIsAlreadyLoaded) {
        return
      }

      loadQuotation({ id: quotationId })
    }
  })

  useUpdateEffect(() => {
    if (!data?.quotation) {
      return
    }

    const quotation = data.quotation

    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

    shareQuotationFormValues.sharedWithSignal.value = quotation.sharedWith ?? []

    shareQuotationFormValues.shareWithOptionSignal.value =
      getWhoQuotationSharedWithOption({ quotation })
  }, [isSuccess])
}
