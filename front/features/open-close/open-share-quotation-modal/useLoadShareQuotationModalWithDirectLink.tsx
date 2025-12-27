import { useGetQuotationMutation } from '@entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { AccessFormValuesSignal } from '@entities/quotation/form/types'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadShareQuotationModalWithDirectLink = ({
  accessFormValuesSignal,
}: Props): void => {
  const urlParams = useParams()
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (urlParams.quotationId !== undefined) {
      const quotationIsAlreadyLoaded =
        getState().quotation.id === urlParams.quotationId

      if (quotationIsAlreadyLoaded === false) {
        getQuotationMutation.mutate({ id: urlParams.quotationId })
      }
    }
  })

  useUpdateEffect(() => {
    if (getQuotationMutation.data?.quotation !== undefined) {
      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: getQuotationMutation.data.quotation,
        }),
      )

      accessFormValuesSignal.value = getQuotationMutation.data.quotation.access
    }
  }, [getQuotationMutation.isSuccess])
}
