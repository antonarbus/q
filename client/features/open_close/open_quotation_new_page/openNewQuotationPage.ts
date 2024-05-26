import { router } from '@lib_instances/Router'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'

export const openNewQuotationPage = (): void => {
  reRenderQuotationSignal.value = nanoid(5)
  void router.navigate(`/${route.new}`)
}
