import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'

export const openQuotationsPage = (): void => {
  void router.navigate(`/${route.quotations}`)
}
