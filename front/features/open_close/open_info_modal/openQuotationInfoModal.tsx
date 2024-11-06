import { instance } from '@shared/instance'
import { route } from '@shared/consts/route'

export const openQuotationInfoModal = (): void => {
  void instance.router.navigate(`./${route.info}`)
}
