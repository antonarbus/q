import { route } from '@shared/lib/react-router-dom/route'
import { router } from '@shared/lib/react-router-dom/router'

export const openQuotationsPage = (): void => {
  setBackToQuotation()
  void router.navigate(`/${route.quotationList}`)
}
function setBackToQuotation() {
  throw new Error('Function not implemented.')
}
