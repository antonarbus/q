import { getFromStore } from '@entity/quotation/redux/getter/getFromStore'
import type { InfoFormValues } from '@entity/quotation/form/types'
import { useSignal } from '@preact/signals-react'
import { useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

type Res = InfoFormValues

export const useInfoFormValues = (): Res => {
  const urlParams = useParams()

  const infoFormValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  useEffectOnce(() => {
    const item = getFromStore({
      id: urlParams.bookmarkId ?? urlParams.quotationId ?? 'new',
    })

    if (item !== undefined) {
      infoFormValues.nameSignal.value = item.name
      infoFormValues.categorySignal.value = item.category
      infoFormValues.descSignal.value = item.desc
      infoFormValues.infoSignal.value = item.info
    }
  })

  return infoFormValues
}
