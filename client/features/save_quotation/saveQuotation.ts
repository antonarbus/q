import { getState } from '@lib_instances/store'
import { type AxiosResponse } from 'axios'
import { produce } from 'immer'
import { customAlphabet } from 'nanoid'
import { type ResBody, type ReqBody } from 'server/api/saveQuotationRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { axiosWithAuth } from '@entities/user'
import { markAsSaved } from '@shared/isSaved'

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  if (quotationSignal.value.id === 'local version') {
    quotationSignal.value = { ...quotationSignal.value, id: nanoid(5) }
  }

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
