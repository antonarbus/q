import { router } from '@lib_instances/router_'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { reRenderQuotationSignal } from '@shared/signals/reRenderQuotationSignal'
import type { QuotationLocationState } from '.'

export const openQuotationPageAndLoadNew = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'new',
  }

  reRenderQuotationSignal.value = nanoid(5)

  void router.navigate(`/${route.new}`, {
    state,
  })
}
