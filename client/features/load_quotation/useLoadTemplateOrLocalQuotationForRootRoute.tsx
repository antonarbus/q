import { dispatch } from '@lib_instances/store'
import { customAlphabet } from 'nanoid'
import { useEffectOnce } from 'react-use'
import { defaultItems, itemsSlice } from '@entities/items'
import { type Item } from '@entities/items/types'
import { type Quotation, quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { route } from '@shared/consts/route'
import { jsonParseSafe } from '@shared/lib/jsonParseSafe'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'

export function useLoadTemplateOrLocalQuotationForRootRoute(): void {
  useEffectOnce(() => {
    if (window.location.pathname !== route.root) return

    const itemsFromLocalStorage = localStorage.getItem(localStorageKey.items)
    if (itemsFromLocalStorage === null) {
      loadTemplate()
      return
    }

    const items = jsonParseSafe<Item[]>(itemsFromLocalStorage)
    if (items === undefined) {
      loadTemplate()
      return
    }

    if (items.length === 0) {
      loadTemplate()
      return
    }

    const quotationFromLocalStorage = localStorage.getItem(localStorageKey.quotation)
    if (quotationFromLocalStorage === null) {
      loadTemplate()
      return
    }

    const quotation = jsonParseSafe<Quotation>(quotationFromLocalStorage)
    if (quotation === undefined) {
      loadTemplate()
      return
    }

    loadingDotsOverlayTextSignal.value = 'Loading existing quotation from browser...'
    setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)
    quotationSignal.value = quotation
    dispatch(itemsSlice.actions.loadItemsReducer({ items }))
  })
}

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')
const quotationId = nanoid(5)

function loadTemplate(): void {
  loadingDotsOverlayTextSignal.value = 'Loading default template...'
  setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 3000)
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  quotationSignal.value = { id: quotationId }
  localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
  localStorage.setItem(localStorageKey.quotation, JSON.stringify(quotationSignal.value))
}
