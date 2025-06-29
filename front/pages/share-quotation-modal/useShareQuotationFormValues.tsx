import type { AccessFormValuesSignal } from '@entities/quotation'
import { useSignal } from '@preact/signals-react'

type Res = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useShareQuotationFormValues = (): Res => {
  const accessFormValuesSignal: AccessFormValuesSignal = useSignal({
    level: 'nobody',
    userList: [],
  })

  return { accessFormValuesSignal }
}
