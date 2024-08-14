import {
  getWhoQuotationSharedWithOption,
  quotationSlice,
  useGetQuotationMutation,
} from '@entities/quotation'
import type { QuotationFormValues } from '@entities/quotation/types'
import { dispatch } from '@lib_instances/store'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  quotationFormValues: QuotationFormValues
}

export const useLoadQuotationModalWithDirectLink = ({
  quotationFormValues,
}: Props): void => {
  const { id } = useParams()

  const {
    mutate: loadQuotation,
    isSuccess: isLoadQuotationSuccess,
    data,
  } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (!id) return
    loadQuotation({ id })
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
  }, [isLoadQuotationSuccess])
}
