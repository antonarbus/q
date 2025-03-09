import { getState } from '@shared/lib/redux'
import { toast } from 'sonner'

export const remindToSaveQuotationOnInsert = (): void => {
  const isLogged = Boolean(getState().user.email)

  if (!isLogged) {
    return
  }

  const id = getState().quotation.id

  if (id === 'new' || !id) {
    toast.info('Do not forget to save quotation')
  }
}
