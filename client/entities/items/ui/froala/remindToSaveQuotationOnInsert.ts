import { quotationSignal } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'

export const remindToSaveQuotationOnInsert = (): void => {
  const id = quotationSignal.peek().id
  if (id === 'new' || !id) {
    notify({ msg: 'Do not forget to save quotation', type: 'info', theme: 'light' })
  }
}
