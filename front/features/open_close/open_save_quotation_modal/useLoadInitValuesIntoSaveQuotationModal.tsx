import type { SaveQuotationFormValues } from '@entities/quotation'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadInitValuesIntoSaveQuotationModal = ({
  saveQuotationFormValues,
}: Props): void => {
  useEffectOnce(() => {
    const { quotation } = getState()

    saveQuotationFormValues.nameSignal.value = quotation.name ?? ''
    saveQuotationFormValues.categorySignal.value = quotation.category ?? ''
    saveQuotationFormValues.descSignal.value = quotation.desc ?? ''
    saveQuotationFormValues.infoSignal.value = quotation.info ?? ''
  })
}
