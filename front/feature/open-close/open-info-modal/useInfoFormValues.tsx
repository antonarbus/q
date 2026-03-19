import { getItemFromStoreById } from '@entity/quotation/redux/getter/getItemFromStoreById'
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
    const item = getItemFromStoreById({
      id: urlParams.bookmarkId ?? urlParams.quotationId ?? 'new',
    })

    if (item !== undefined) {
      infoFormValues.nameSignal.value = item.data.name
      infoFormValues.categorySignal.value = item.data.category
      infoFormValues.descSignal.value = item.data.desc
      infoFormValues.infoSignal.value = item.data.info
    }
  })

  return infoFormValues
}
