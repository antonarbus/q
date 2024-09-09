import { router } from '@lib_instances/router'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import type { QuotationLocationState } from '.'
import { reRenderQuotationSignal } from '@entities/quotation'

export const openQuotationPageAndLoadNew = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'new',
  }

  reRenderQuotationSignal.value = nanoid(5)

  void router.navigate(`/${route.new}`, {
    state,
  })
}
