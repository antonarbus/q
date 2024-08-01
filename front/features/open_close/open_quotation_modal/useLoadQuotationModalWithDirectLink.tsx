import {
  getWhoQuotationSharedWithOption,
  quotationSlice,
  useGetQuotationMutation,
} from '@entities/quotation'
import { dispatch } from '@lib_instances/store'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import type { Signal } from '@preact/signals-react'
import type { SharedWithOption } from '@shared/consts/sharedWithOption'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
  sharedWithSignal: Signal<string[]>
  shareWithOptionSignal: Signal<SharedWithOption>
}

export const useLoadQuotationModalWithDirectLink = ({
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
  sharedWithSignal,
  shareWithOptionSignal,
}: Props): void => {
  const { id } = useParams()

  const {
    mutate: loadQuotation,
    isSuccess: isLoadQuotationSuccess,
    data,
  } = useGetQuotationMutation()

  useEffectOnce(() => {
    if (!id) return
    loadQuotation({ id })
  })

  useUpdateEffect(() => {
    if (!data?.quotation) return

    const quotation = data.quotation

    dispatch(quotationSlice.actions.loadQuotationReducer({ quotation }))

    nameSignal.value = quotation.name ?? ''
    categorySignal.value = quotation.category ?? ''
    descSignal.value = quotation.desc ?? ''
    infoSignal.value = quotation.info ?? ''
    shareWithOptionSignal.value = getWhoQuotationSharedWithOption({ quotation })
    sharedWithSignal.value = quotation.sharedWith ?? []
  }, [isLoadQuotationSuccess])
}
