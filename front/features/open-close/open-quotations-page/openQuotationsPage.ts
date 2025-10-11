import { showBackIconAtNav } from '@entities/quotation/util/setBackToQuotation'
import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'

export const openQuotationsPage = (): void => {
  showBackIconAtNav()
  void router.navigate(`/${route.quotationList}`)
}
