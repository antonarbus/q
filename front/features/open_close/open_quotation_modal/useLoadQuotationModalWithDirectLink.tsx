import {
  getWhoQuotationSharedWithOption,
  quotationSlice,
  useGetQuotationMutation,
} from '@entities/quotation'
import type { QuotationFormValues } from '@entities/quotation/types'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  quotationFormValues: QuotationFormValues
}

export const useLoadQuotationModalWithDirectLink = ({
  quotationFormValues,
}: Props): void => {
  const { quotationId } = useParams()

  const { mutate: loadQuotation, isSuccess, data } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (quotationId) {
      const quotationIsAlreadyLoaded = getState().quotation.id === quotationId
      if (quotationIsAlreadyLoaded) return

      loadQuotation({ id: quotationId })
    }
  })

  useUpdateEffect(() => {
    if (!data?.quotation) return

    const quotation = data.quotation

    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

    quotationFormValues.nameSignal.value = quotation.name ?? ''
    quotationFormValues.categorySignal.value = quotation.category ?? ''
    quotationFormValues.descSignal.value = quotation.desc ?? ''
    quotationFormValues.infoSignal.value = quotation.info ?? ''
    quotationFormValues.sharedWithSignal.value = quotation.sharedWith ?? []

    quotationFormValues.shareWithOptionSignal.value =
      getWhoQuotationSharedWithOption({ quotation })
  }, [isSuccess])
}
