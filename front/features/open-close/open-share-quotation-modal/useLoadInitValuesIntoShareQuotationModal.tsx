import type { AccessFormValuesSignal } from '@entities/quotation/form/types'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadInitValuesIntoShareQuotationModal = ({
  accessFormValuesSignal,
}: Props): void => {
  useEffectOnce(() => {
    const state = getState()
    accessFormValuesSignal.value = state.quotation.access
  })
}
