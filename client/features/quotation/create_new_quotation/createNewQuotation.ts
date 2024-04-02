import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { reRenderQuotationSignal } from './reRenderQuotationSignal'

export const createNewQuotation = (): void => {
  reRenderQuotationSignal.value = nanoid(3)
  void router.navigate(route.root)
}
