import type { ShareQuotationFormValues } from '@entities/quotation'

type Props = {
  shareQuotationFormValues: ShareQuotationFormValues
}

export const useIsButtonDisabled = ({
  shareQuotationFormValues,
}: Props): boolean => {
  const forgotToAddPerson =
    shareQuotationFormValues.shareWithOptionSignal.value === 'persons' &&
    shareQuotationFormValues.sharedWithSignal.value.length === 0

  return forgotToAddPerson
}
