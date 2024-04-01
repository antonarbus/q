import { router } from '@lib_instances/Router'
import { reRenderItemsSignal } from '@entities/items'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'

export const createNewQuotation = (): void => {
  reRenderItemsSignal.value = nanoid(3)
  void router.navigate(route.root)
}
