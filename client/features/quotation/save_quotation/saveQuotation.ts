import { dispatch, getState } from '@lib_instances/store'
import { ResBody } from '@server/api/saveQuotationRouter'
import { AxiosError } from 'axios'
import { quotationSignal, saveQuotationFn, updateOrAppendIntoQuotationsCache } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

export const saveQuotation = async (): Promise<void> => {
  const email = getState().user.email

  if (!email) {
    notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
    return
  }

  showLoadingNavIcon({ navMenuItemIdKey: 'save' })

  if (quotationSignal.value.id === 'template version') {
    quotationSignal.value = { ...quotationSignal.value, id: nanoid(5), email }
  }

  try {
    const { document, message } = await saveQuotationFn({
      quotation: quotationSignal.value,
      items: getState().items,
    })

    if (message === 'inserted') {
      notify({ msg: 'Created', type: 'success', theme: 'light' })
    }

    if (message === 'saved') {
      notify({ msg: 'Updated', type: 'success', theme: 'light' })
    }

    quotationSignal.value = { ...quotationSignal.value, ...document }
    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
    updateOrAppendIntoQuotationsCache({ quotation: quotationSignal.value })
    // change url to specific quotation id
    window.history.replaceState('', '', `/${quotationSignal.value.id}`)
  } catch (error) {
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }
}
