import { dispatch } from '@lib_instances/store'
import { type Signal, useSignalEffect } from '@preact/signals-react'
import { quotationSlice } from '@entities/quotation'

type Props = {
  nameSignal: Signal<string | undefined>
  categorySignal: Signal<string | undefined>
  descSignal: Signal<string | undefined>
  infoSignal: Signal<string | undefined>
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
      quotationSlice.actions.updateItemInfoReducer({
        id,
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
        info: infoSignal.value,
      }),
    )
  })
}
