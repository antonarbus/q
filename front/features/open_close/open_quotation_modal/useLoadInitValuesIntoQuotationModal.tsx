import { getWhoQuotationSharedWithOption } from '@entities/quotation'
import type { QuotationFormValues } from '@entities/quotation/types'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  quotationFormValues: QuotationFormValues
}

export const useLoadInitValuesIntoQuotationModal = ({
  quotationFormValues,
}: Props): void => {
  useEffectOnce(() => {
    const quotation = getState().quotation

    quotationFormValues.nameSignal.value = quotation.name ?? ''
    quotationFormValues.categorySignal.value = quotation.category ?? ''
    quotationFormValues.descSignal.value = quotation.desc ?? ''
    quotationFormValues.infoSignal.value = quotation.info ?? ''
    quotationFormValues.sharedWithSignal.value = quotation.sharedWith ?? []

    quotationFormValues.shareWithOptionSignal.value =
      getWhoQuotationSharedWithOption({ quotation })
  })
}
