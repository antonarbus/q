import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'

export const openQuotationInfoModal = (): void => {
  void router.navigate(`./${route.info}`)
}
