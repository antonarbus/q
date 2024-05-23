import { dispatch } from '@lib_instances/store'
import { type Signal, useSignalEffect } from '@preact/signals-react'
import { quotationSlice } from '@entities/quotation'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
  id: string
}

export const useUpdateItemInfo = ({
  id,
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
}: Props): void => {
  useSignalEffect(() => {
    dispatch(
      quotationSlice.actions.updateItemInfoByIdReducer({
        id,
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
        info: infoSignal.value,
      }),
    )
  })
}
