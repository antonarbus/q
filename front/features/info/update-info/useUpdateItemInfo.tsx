import { type InfoFormValues, quotationSlice } from '@entities/quotation'
import { useSignalEffect } from '@preact/signals-react'
import { dispatch } from '@shared/lib/redux'

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
