import { router } from '@lib_instances/router'
import { getState } from '@lib_instances/store'
import { route } from '@shared/consts/route'

export const openQuotationInfoModal = (): void => {
  void router.navigate(`./${route.infoQuotation}/${getState().quotation.id}`)
}
