import { dispatch } from '@lib_instances/store'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { useEffectOnce } from 'react-use'
import { defaultItems, itemsSlice } from '@entities/items'
import { type Item } from '@entities/items/types'
import { quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { navSlice } from '@shared/nav'
import { jsonParseSafe } from '@shared/utils/jsonParseSafe'

export function useLoadQuotationFromBrowser(): void {
  useEffectOnce(() => {
    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)
    const quotation = jsonParseSafe<QuotationModelType>(quotationFromLocalStorage)

    const shouldLoadTemplate =
      itemsFromLocalStorage === null ||
      items === undefined ||
      items.length === 0 ||
      quotationFromLocalStorage === null ||
      quotation === undefined

    const shouldLoadFromBrowser = !shouldLoadTemplate

    if (shouldLoadTemplate) {
      loadingDotsOverlayTextSignal.value = 'Loading template...'
      dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
      quotationSignal.value = { id: 'local version', email: '' }
      localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
      localStorage.setItem(localStorageKey.quotation, JSON.stringify(quotationSignal.value))
    }

    if (shouldLoadFromBrowser) {
      loadingDotsOverlayTextSignal.value = 'Loading from browser...'
      quotationSignal.value = quotation
      dispatch(itemsSlice.actions.loadItemsReducer({ items }))
      if (quotation.id !== 'local version') {
        window.history.replaceState('', '', `/${quotation.id}`)
      }
    }

    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'pdf' }))
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'share' }))
    setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)
  })
}
