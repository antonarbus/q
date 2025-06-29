import {
  quotationSlice,
  useGetQuotationMutation,
  type AccessFormValuesSignal,
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
  const { mutate: loadQuotation, isSuccess, data } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (quotationId !== undefined) {
      const quotationIsAlreadyLoaded = getState().quotation.id === quotationId

      if (quotationIsAlreadyLoaded === true) {
        return
      }

      loadQuotation({ id: quotationId })
    }
  })

  useUpdateEffect(() => {
    if (data?.quotation === undefined) {
      return
    }

    const { quotation } = data
    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))
    accessFormValuesSignal.value = quotation.access
  }, [isSuccess])
}
