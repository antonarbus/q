import { getFromStore } from '@entities/quotation/redux/getter/getFromStore'
import type { InfoFormValues } from '@entities/quotation/form/types'
import { useSelector } from '@shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'

type Props = {
  infoFormValues: InfoFormValues
}

export const useLoadInfoModalOpenedWithDirectLink = (props: Props): void => {
  const quotation = useSelector((state) => state.quotation)
  const urlParams = useParams()

  useUpdateEffect(() => {
    const item = getFromStore({
      id: urlParams.bookmarkId ?? urlParams.quotationId ?? 'new',
    })

    if (item !== undefined) {
      props.infoFormValues.nameSignal.value = item.name
      props.infoFormValues.categorySignal.value = item.category
      props.infoFormValues.descSignal.value = item.desc
      props.infoFormValues.infoSignal.value = item.info
    }
  }, [quotation])
}
