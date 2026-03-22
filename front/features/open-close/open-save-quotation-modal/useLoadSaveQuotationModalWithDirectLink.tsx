import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { SaveQuotationFormValues } from '@front/entities/quotation/form/types'
import { dispatch, getState } from '@front/shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadSaveQuotationModalWithDirectLink = (props: Props): void => {
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
      quotationSlice.actions.loadQuotation({
        quotation: getQuotationMutation.data.quotation,
      }),
    )

    props.saveQuotationFormValues.nameSignal.value =
      getQuotationMutation.data.quotation.name

    props.saveQuotationFormValues.categorySignal.value =
      getQuotationMutation.data.quotation.category

    props.saveQuotationFormValues.descSignal.value =
      getQuotationMutation.data.quotation.desc

    props.saveQuotationFormValues.infoSignal.value =
      getQuotationMutation.data.quotation.info
  }, [getQuotationMutation.isSuccess])
}
