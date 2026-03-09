import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import type { InfoFormValues } from '@entity/quotation/form/types'
import { useSignalEffect } from '@preact/signals-react'
import { dispatch } from '@shared/lib/redux'

type Props = {
  id: string
  infoFormValues: InfoFormValues
}

export const useUpdateItemInfo = (props: Props): void => {
  useSignalEffect(() => {
    dispatch(
      quotationSlice.actions.updateItemInfo({
        id: props.id,
        name: props.infoFormValues.nameSignal.value,
        category: props.infoFormValues.categorySignal.value,
        desc: props.infoFormValues.descSignal.value,
        info: props.infoFormValues.infoSignal.value,
      }),
    )
  })
}
