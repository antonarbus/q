import { getState } from '@lib_instances/store'
import { type AxiosResponse } from 'axios'
import { type ResBody, type ReqBody } from 'server/api/saveQuotationRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { axiosWithAuth } from '@entities/user'
import { markAsSaved } from '@shared/isSaved'

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  try {
    const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, ReqBody>({
      method: 'POST',
      url: apiUrl.saveQuotation,
      data: {
        quotation: quotationSignal.value,
        items: getState().items,
        id: quotationSignal.value.id,
      },
    })

    quotationSignal.value = {
      ...quotationSignal.value,
      ...res.data.document,
    }

    saveQuotationLocally()
    markAsSaved()

    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
