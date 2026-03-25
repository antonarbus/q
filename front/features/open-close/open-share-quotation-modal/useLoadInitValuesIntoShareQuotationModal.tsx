import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { reduxHolder } from '@front/shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadInitValuesIntoShareQuotationModal = (
  props: Props,
): void => {
  useEffectOnce(() => {
    const state = reduxHolder.getState()
    props.accessFormValuesSignal.value = state.quotation.access
  })
}
