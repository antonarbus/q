import {
  type AccessFormValuesSignal,
  quotationSlice,
  useGetQuotationMutation,
} from '@entities/quotation'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadShareQuotationModalWithDirectLink = ({
  accessFormValuesSignal,
}: Props): void => {
  const { quotationId } = useParams()
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (quotationId !== undefined) {
      const quotationIsAlreadyLoaded = getState().quotation.id === quotationId

      if (quotationIsAlreadyLoaded === false) {
        getQuotationMutation.mutate({ id: quotationId })
      }
    }
  })

  useUpdateEffect(() => {
    if (getQuotationMutation.data?.quotation !== undefined) {
      const { quotation } = getQuotationMutation.data
      dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
      accessFormValuesSignal.value = quotation.access
    }
  }, [getQuotationMutation.isSuccess])
}
