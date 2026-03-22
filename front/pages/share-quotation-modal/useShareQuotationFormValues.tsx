import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { useSignal } from '@preact/signals-react'

type Res = AccessFormValuesSignal

export const useShareQuotationFormValues = (): Res => {
  const accessFormValuesSignal: AccessFormValuesSignal = useSignal({
    level: 'nobody',
    userList: [],
  })

  return accessFormValuesSignal
}
