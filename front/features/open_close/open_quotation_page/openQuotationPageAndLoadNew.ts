import { router } from '@shared/lib/router'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import type { QuotationLocationState } from '.'
import { reLoadQuotationSignal } from '@entities/quotation'

export const openQuotationPageAndLoadNew = (): void => {
  const state: QuotationLocationState = {
    quotationType: 'new',
  }

  reLoadQuotationSignal.value = nanoid(5)

  void router.navigate(`/${route.new}`, {
    state,
  })
}
