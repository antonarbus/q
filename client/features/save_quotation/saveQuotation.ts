import { getState } from '@lib_instances/store'
import { apiUrl } from 'server/apiUrls'
import { showErrorAtNavIcon, showLoadingAtNavIcon, showSuccessAtNavIcon } from '@entities/nav'
import { axiosWithAuth } from '@entities/user'

export const saveQuotation = async (): Promise<void> => {
  showLoadingAtNavIcon({ navMenuItemIdKey: 'save' })

  try {
    const res = await axiosWithAuth({
      method: 'POST',
      url: apiUrl.saveQuotation,
      data: {
        quotation: getState().quotation,
        items: getState().items,
      },
    })

    showSuccessAtNavIcon({ navMenuItemIdKey: 'save' })
  } catch (error) {
    showErrorAtNavIcon({ navMenuItemIdKey: 'save' })
  }
}
