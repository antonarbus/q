import { getState } from '@lib_instances/store'
import { notify } from '@shared/ui/top_msg'

export const remindToSaveQuotationOnInsert = (): void => {
  const isLogged = Boolean(getState().user.email)
  if (!isLogged) return

  const id = getState().quotation.id

  if (id === 'new' || !id) {
    notify({
      msg: 'Do not forget to save quotation',
      type: 'info',
      theme: 'light',
    })
  }
}
