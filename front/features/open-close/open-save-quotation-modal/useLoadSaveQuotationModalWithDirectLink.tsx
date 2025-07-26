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
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (quotationId !== undefined) {
      const quotationIsAlreadyLoaded = getState().quotation.id === quotationId

      if (quotationIsAlreadyLoaded === true) {
        return
      }

      getQuotationMutation.mutate({ id: quotationId })
    }
  })

  useUpdateEffect(() => {
    if (getQuotationMutation.data?.quotation === undefined) {
      return
    }

    const { quotation } = getQuotationMutation.data

    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

    saveQuotationFormValues.nameSignal.value = quotation.name ?? ''
    saveQuotationFormValues.categorySignal.value = quotation.category ?? ''
    saveQuotationFormValues.descSignal.value = quotation.desc ?? ''
    saveQuotationFormValues.infoSignal.value = quotation.info ?? ''
  }, [getQuotationMutation.isSuccess])
}
