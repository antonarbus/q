import { router } from '@lib_instances/Router'
import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { defaultItems, isItemsFroalaSignal, itemsSlice, reRenderItemsSignal } from '@entities/items'
import { quotationSignal } from '@entities/quotation'
import { route } from '@shared/consts/route'
import { nanoid } from '@shared/lib/nanoid'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'

export const createNewQuotation = (): void => {
  isItemsFroalaSignal.value = false
  setTimeout(() => { isItemsFroalaSignal.value = true }, 1000 * theme.item.animationDuration)

  reRenderItemsSignal.value = nanoid(3)

  void router.navigate(route.root)

  loadingDotsOverlayTextSignal.value = 'Loading template...'
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  quotationSignal.value = { id: 'template version', email: '' }

  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
  dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
  setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)
}
