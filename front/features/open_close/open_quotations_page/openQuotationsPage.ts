import { instance } from '@shared/instance'
import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/consts/route'

export const openQuotationsPage = (): void => {
  setBackToQuotation()
  void instance.router.navigate(`/${route.quotations}`)
}
