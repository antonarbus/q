import { router } from '@shared/lib/router'
import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/consts/route'

export const openQuotationsPage = (): void => {
  setBackToQuotation()
  void router.navigate(`/${route.quotations}`)
}
