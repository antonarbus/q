import { useGetQuotationMutation } from '@entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'
import type { SaveQuotationFormValues } from '@entities/quotation/form/types'
import { dispatch, getState } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadSaveQuotationModalWithDirectLink = ({
  saveQuotationFormValues,
}: Props): void => {
  const urlParams = useParams()
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (urlParams.quotationId !== undefined) {
      const quotationIsAlreadyLoaded =
        getState().quotation.id === urlParams.quotationId

      if (quotationIsAlreadyLoaded === true) {
        return
      }

      getQuotationMutation.mutate({ id: urlParams.quotationId })
    }
  })

  useUpdateEffect(() => {
    if (getQuotationMutation.data?.quotation === undefined) {
      return
    }

    dispatch(
      quotationSlice.actions.loadQuotationReducer({
        quotation: getQuotationMutation.data.quotation,
      }),
    )

    saveQuotationFormValues.nameSignal.value =
      getQuotationMutation.data.quotation.name

    saveQuotationFormValues.categorySignal.value =
      getQuotationMutation.data.quotation.category

    saveQuotationFormValues.descSignal.value =
      getQuotationMutation.data.quotation.desc

    saveQuotationFormValues.infoSignal.value =
      getQuotationMutation.data.quotation.info
  }, [getQuotationMutation.isSuccess])
}
