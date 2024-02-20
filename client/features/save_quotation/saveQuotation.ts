import { getState } from '@lib_instances/store'
import { type Body } from 'server/api/saveQuotationRouter'
import { apiUrl } from 'server/consts/apiUrl'
import { showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@entities/nav'
import { axiosWithAuth } from '@entities/user'

export const saveQuotation = async (): Promise<void> => {
  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  try {
    const res = await axiosWithAuth<_, _, Body>({
      method: 'POST',
      url: apiUrl.saveQuotation,
      data: {
        quotation: getState().quotation,
        items: getState().items,
      },
    })

    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
