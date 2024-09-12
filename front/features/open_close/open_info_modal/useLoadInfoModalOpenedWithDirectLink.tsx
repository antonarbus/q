import { getFromStore } from '@entities/quotation'
import type { InfoFormValues } from '@entities/quotation/types'
import { useSelectorTyped } from '@lib_instances/store'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'

type Props = {
  infoFormValues: InfoFormValues
}

export const useLoadInfoModalOpenedWithDirectLink = ({
  infoFormValues,
}: Props): void => {
  const quotation = useSelectorTyped((state) => state.quotation)
  const { quotationId, bookmarkId } = useParams()

  useUpdateEffect(() => {
    const item = getFromStore({ id: bookmarkId ?? quotationId ?? 'new' })

    if (item) {
      infoFormValues.nameSignal.value = item.name ?? ''
      infoFormValues.categorySignal.value = item.category ?? ''
      infoFormValues.descSignal.value = item.desc ?? ''
      infoFormValues.infoSignal.value = item.info ?? ''
    }
  }, [quotation])
}
