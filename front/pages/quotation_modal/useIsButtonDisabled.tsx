import type { QuotationFormValues } from '@entities/quotation/types'

type Props = {
  quotationFormValues: QuotationFormValues
}

export const useIsButtonDisabled = ({
  quotationFormValues,
}: Props): boolean => {
  const missingName = quotationFormValues.nameSignal.value === ''
  const missingCategory = quotationFormValues.categorySignal.value === ''

  const forgotToAddPerson =
    quotationFormValues.shareWithOptionSignal.value === 'persons' &&
    quotationFormValues.sharedWithSignal.value.length === 0

  const isButtonDisabled = missingName || missingCategory || forgotToAddPerson

  return isButtonDisabled
}
