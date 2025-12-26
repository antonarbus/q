import { getFromStore } from '@entities/quotation/redux/getter/getFromStore'
import type { InfoFormValues } from '@entities/quotation/form/types'
import { useSelector } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'

type Props = {
  infoFormValues: InfoFormValues
}

export const useLoadInfoModalOpenedWithDirectLink = ({
  infoFormValues,
}: Props): void => {
  const quotation = useSelector((state) => state.quotation)
  const { quotationId, bookmarkId } = useParams()

  useUpdateEffect(() => {
    const item = getFromStore({ id: bookmarkId ?? quotationId ?? 'new' })

    if (item !== undefined) {
      infoFormValues.nameSignal.value = item.name ?? ''
      infoFormValues.categorySignal.value = item.category ?? ''
      infoFormValues.descSignal.value = item.desc ?? ''
      infoFormValues.infoSignal.value = item.info ?? ''
    }
  }, [quotation])
}
