import type { SaveQuotationFormValues } from '@entities/quotation'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useIsButtonDisabled = ({
  saveQuotationFormValues,
}: Props): boolean => {
  const missingName = saveQuotationFormValues.nameSignal.value === ''
  const missingCategory = saveQuotationFormValues.categorySignal.value === ''
  const isButtonDisabled = missingName || missingCategory

  return isButtonDisabled
}
