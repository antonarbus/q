import type { AccessFormValuesSignal } from '@entity/quotation/form/types'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadInitValuesIntoShareQuotationModal = (
  props: Props,
): void => {
  useEffectOnce(() => {
    const state = getState()
    props.accessFormValuesSignal.value = state.quotation.access
  })
}
