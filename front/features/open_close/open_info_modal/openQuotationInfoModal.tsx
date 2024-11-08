import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'

export const openQuotationInfoModal = (): void => {
  void router.navigate(`./${route.info}`)
}
