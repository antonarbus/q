import type { SaveQuotationFormValues } from '@front/entities/quotation/form/types'
import { getState } from '@front/shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  saveQuotationFormValues: SaveQuotationFormValues
}

export const useLoadInitValuesIntoSaveQuotationModal = (props: Props): void => {
  useEffectOnce(() => {
    const state = getState()

    props.saveQuotationFormValues.nameSignal.value = state.quotation.name

    props.saveQuotationFormValues.categorySignal.value =
      state.quotation.category

    props.saveQuotationFormValues.descSignal.value = state.quotation.desc
    props.saveQuotationFormValues.infoSignal.value = state.quotation.info
  })
}
