import {
  getWhoQuotationSharedWithOption,
  type ShareQuotationFormValues,
} from '@entities/quotation'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  shareQuotationFormValues: ShareQuotationFormValues
}

export const useLoadInitValuesIntoShareQuotationModal = ({
  shareQuotationFormValues,
}: Props): void => {
  useEffectOnce(() => {
    const { quotation } = getState()

    shareQuotationFormValues.sharedWithSignal.value = quotation.sharedWith ?? []

    shareQuotationFormValues.shareWithOptionSignal.value =
      getWhoQuotationSharedWithOption({ quotation })
  })
}
