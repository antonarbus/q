import { dispatch } from '@lib_instances/store'
import { type Signal, useSignalEffect } from '@preact/signals-react'
import { quotationSlice } from '@entities/quotation'

type Props = {
  infoSignal: Signal<string>
  id: string
}

export const useUpdateInfo = ({ infoSignal, id }: Props): void => {
  useSignalEffect(() => {
    dispatch(quotationSlice.actions.updateItemInfoByIdReducer({
      id,
      info: infoSignal.value,
    }))
  })
}
