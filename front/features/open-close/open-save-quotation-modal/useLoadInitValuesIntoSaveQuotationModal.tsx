import type { SaveQuotationFormValues } from '@entities/quotation/form/types'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadInitValuesIntoSaveQuotationModal = ({
  saveQuotationFormValues,
}: Props): void => {
  useEffectOnce(() => {
    const state = getState()

    saveQuotationFormValues.nameSignal.value = state.quotation.name
    saveQuotationFormValues.categorySignal.value = state.quotation.category
    saveQuotationFormValues.descSignal.value = state.quotation.desc
    saveQuotationFormValues.infoSignal.value = state.quotation.info
  })
}
