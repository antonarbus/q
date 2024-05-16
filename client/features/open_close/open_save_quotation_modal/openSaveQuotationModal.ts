import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'

export const openSaveQuotationModal = (): void => {
  void router.navigate(`./${route.saveQuotation}`)
}
