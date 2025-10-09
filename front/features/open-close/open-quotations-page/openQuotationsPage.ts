import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/const/route'
import { router } from '@shared/lib/react-router-dom'

export const openQuotationsPage = (): void => {
  setBackToQuotation()
  void router.navigate(`/${route.quotationList}`)
}
