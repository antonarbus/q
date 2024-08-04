import type { QuotationFormValues } from '@entities/quotation/types'

type Props = {
  quotationFormValues: QuotationFormValues
}

export const useIsButtonDisabled = ({
  quotationFormValues,
}: Props): boolean => {
  const forgotToAddPerson =
    quotationFormValues.shareWithOptionSignal.value === 'persons' &&
    quotationFormValues.sharedWithSignal.value.length === 0

  const isButtonDisabled =
    quotationFormValues.nameSignal.value === '' ||
    quotationFormValues.categorySignal.value === '' ||
    forgotToAddPerson

  return isButtonDisabled
}
