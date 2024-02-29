import { getState } from '@lib_instances/store'
import { type AxiosResponse } from 'axios'
import { type ResBody, type ReqBody } from 'server/api/saveQuotationRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { quotationSignal, saveQuotationLocally } from '@client/entities/quotation'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { axiosWithAuth } from '@entities/user'

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  try {
    const res = await axiosWithAuth<ResBody, AxiosResponse<ResBody>, ReqBody>({
      method: 'POST',
      url: apiUrl.saveQuotation,
      data: {
        quotation: quotationSignal.value,
        items: getState().items,
      },
    })

    quotationSignal.value = {
      ...quotationSignal.value,
      ...res.data.document,
    }

    saveQuotationLocally()

    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
