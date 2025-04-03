import type { ShareQuotationFormValues } from '@entities/quotation'
import { getState } from '@shared/lib/redux'

type Props = {
  shareQuotationFormValues: ShareQuotationFormValues
}

export const useIsButtonDisabled = ({
  shareQuotationFormValues,
}: Props): boolean => {
  const forgotToAddPerson =
    shareQuotationFormValues.shareWithOptionSignal.value === 'persons' &&
    shareQuotationFormValues.sharedWithSignal.value.length === 0

  const currentlySharedWith = getState().quotation.sharedWith ?? []

  const sharedWithValueChanged =
    currentlySharedWith.toString() !==
    shareQuotationFormValues.sharedWithSignal.value.toString()

  const disabled = forgotToAddPerson || !sharedWithValueChanged

  return disabled
}
