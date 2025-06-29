import { useEffectOnce } from 'react-use'
import { useSignal } from '@preact/signals-react'
import { getFromStore, type InfoFormValues } from '@entities/quotation'
import { useParams } from 'react-router-dom'

type Res = {
  infoFormValues: InfoFormValues
}

export const useLoadInitValuesIntoInfoModal = (): Res => {
  const { quotationId, bookmarkId } = useParams()

  const infoFormValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  useEffectOnce(() => {
    const item = getFromStore({ id: bookmarkId ?? quotationId ?? 'new' })

    if (item !== undefined) {
      infoFormValues.nameSignal.value = item.name ?? ''
      infoFormValues.categorySignal.value = item.category ?? ''
      infoFormValues.descSignal.value = item.desc ?? ''
      infoFormValues.infoSignal.value = item.info ?? ''
    }
  })

  return { infoFormValues }
}
