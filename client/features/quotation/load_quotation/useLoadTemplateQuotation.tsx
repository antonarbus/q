import { dispatch } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import { defaultItems, itemsSlice } from '@entities/items'
import { quotationSignal } from '@entities/quotation'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'

export function useLoadTemplateQuotation(): void {
  useEffectOnce(() => {
    loadingDotsOverlayTextSignal.value = 'Loading template...'
    dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
    quotationSignal.value = { id: 'template version', email: '' }

    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
    setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)
  })
}
