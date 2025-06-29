import type { AccessFormValuesSignal } from '@entities/quotation'
import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useLoadInitValuesIntoShareQuotationModal = ({
  accessFormValuesSignal,
}: Props): void => {
  useEffectOnce(() => {
    const { quotation } = getState()
    accessFormValuesSignal.value = quotation.access
  })
}
