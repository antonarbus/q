import { useGetQuotationMutation } from '@front/entities/quotation/api/useGetQuotationMutation'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadShareQuotationModalWithDirectLink = (props: Props): void => {
  const urlParams = useParams()
  const getQuotationMutation = useGetQuotationMutation()

  useEffectOnce(() => {
    if (urlParams.quotationId !== undefined) {
      const quotationIsAlreadyLoaded = reduxHolder.getState().quotation.id === urlParams.quotationId

      if (quotationIsAlreadyLoaded === false) {
        getQuotationMutation.mutate({ id: urlParams.quotationId })
      }
    }
  })

  useUpdateEffect(() => {
    if (getQuotationMutation.data?.quotation !== undefined) {
      reduxHolder.dispatch(
        quotationSlice.actions.loadQuotation({
          quotation: getQuotationMutation.data.quotation,
        }),
      )

      props.accessFormValuesSignal.value = getQuotationMutation.data.quotation.access
    }
  }, [getQuotationMutation.isSuccess])
}
