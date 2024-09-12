import { dispatch } from '@lib_instances/store'
import { useSignalEffect } from '@preact/signals-react'
import { quotationSlice } from '@entities/quotation'
import type { InfoFormValues } from '@entities/quotation/types'

type Props = {
  id: string
  infoFormValues: InfoFormValues
}

export const useUpdateItemInfo = ({ id, infoFormValues }: Props): void => {
  useSignalEffect(() => {
    dispatch(
      quotationSlice.actions.updateItemInfoReducer({
        id,
        name: infoFormValues.nameSignal.value,
        category: infoFormValues.categorySignal.value,
        desc: infoFormValues.descSignal.value,
        info: infoFormValues.infoSignal.value,
      }),
    )
  })
}
