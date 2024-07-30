import { getWhoQuotationSharedWithOption } from '@entities/quotation'
import { getState } from '@lib_instances/store'
import type { Signal } from '@preact/signals-react'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'
import { useEffectOnce } from 'react-use'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
  sharedWithSignal: Signal<string[]>
  shareWithOptionSignal: Signal<SharedWithOption>
}

export const useLoadInitValuesIntoQuotationEditForm = ({
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
  sharedWithSignal,
  shareWithOptionSignal,
}: Props): void => {
  useEffectOnce(() => {
    const quotation = getState().quotation

    nameSignal.value = quotation.name ?? ''
    categorySignal.value = quotation.category ?? ''
    descSignal.value = quotation.desc ?? ''
    infoSignal.value = quotation.info ?? ''

    shareWithOptionSignal.value = getWhoQuotationSharedWithOption({
      quotation,
    })

    sharedWithSignal.value = quotation.sharedWith ?? []
  })
}
