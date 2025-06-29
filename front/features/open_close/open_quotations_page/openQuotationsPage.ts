import { router } from '@shared/lib/react-router-dom'
import { setBackToQuotation } from '@entities/quotation'
import { route } from '@shared/const/route'

export const openQuotationsPage = (): void => {
  setBackToQuotation()
  void router.navigate(`/${route.quotationList}`)
}
