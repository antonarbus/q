import { getState } from '@shared/lib/redux'
import { toast } from 'sonner'

export const remindToSaveQuotationOnInsert = (): void => {
  const isLogged = Boolean(getState().user.email)

  if (isLogged === false) {
    return
  }

  const { id } = getState().quotation

  if (id === 'new') {
    toast.info('Do not forget to save quotation')
  }
}
