import {
  quotationSlice,
  useGetQuotationMutation,
  type SaveQuotationFormValues,
} from '@entities/quotation'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadSaveQuotationModalWithDirectLink = ({
  saveQuotationFormValues,
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

    saveQuotationFormValues.nameSignal.value = quotation.name ?? ''
    saveQuotationFormValues.categorySignal.value = quotation.category ?? ''
    saveQuotationFormValues.descSignal.value = quotation.desc ?? ''
    saveQuotationFormValues.infoSignal.value = quotation.info ?? ''
  }, [isSuccess])
}
