import { getItemFromStoreById } from '@front/entities/quotation/redux/getter/getItemFromStoreById'
import type { InfoFormValues } from '@front/entities/quotation/form/types'
import { reduxHolder } from '@front/shared/lib/redux'
import { useParams } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'

type Props = {
  infoFormValues: InfoFormValues
}

export const useLoadInfoModalOpenedWithDirectLink = (props: Props): void => {
  const quotation = reduxHolder.useSelector((state) => state.quotation)
  const urlParams = useParams()

  useUpdateEffect(() => {
    const item = getItemFromStoreById({
      id: urlParams.bookmarkId ?? urlParams.quotationId ?? 'new',
    })

    if (item !== undefined) {
      props.infoFormValues.nameSignal.value = item.data.name
      props.infoFormValues.categorySignal.value = item.data.category
      props.infoFormValues.descSignal.value = item.data.desc
      props.infoFormValues.infoSignal.value = item.data.info
    }
  }, [quotation])
}
