import { getFromStore, type InfoFormValues } from '@entities/quotation'
import { useSignal } from '@preact/signals-react'
import { useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

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
