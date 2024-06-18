import { dispatch } from '@lib_instances/store'
import { type Signal, useSignalEffect } from '@preact/signals-react'
import { quotationSlice } from '@entities/quotation'

type Props = {
  nameSignal: Signal<string | undefined>
  categorySignal: Signal<string | undefined>
  descSignal: Signal<string | undefined>
  infoSignal: Signal<string | undefined>
}

export const useUpdateQuotationInfo = ({
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
}: Props): void => {
  useSignalEffect(() => {
    dispatch(
      quotationSlice.actions.updateQuotationInfoReducer({
        name: nameSignal.value,
        category: categorySignal.value,
        desc: descSignal.value,
        info: infoSignal.value,
      }),
    )
  })
}
