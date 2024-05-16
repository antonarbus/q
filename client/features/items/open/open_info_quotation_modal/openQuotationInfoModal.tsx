import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'

export const openQuotationInfoModal = (): void => {
  void router.navigate(`./${route.quotationInfo}`)
}
