import { dispatch } from '@lib_instances/store'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import { useEffectOnce } from 'react-use'
import { defaultItems, itemsSlice } from '@entities/items'
import { type Item } from '@entities/items/types'
import { quotationSignal } from '@entities/quotation'
import { localStorageKey } from '@shared/consts/localStorageKey'
import { loadingDotsOverlayTextSignal } from '@shared/loading_dots_overlay'
import { jsonParseSafe } from '@shared/utils/jsonParseSafe'

// todo: loadTemplate() should go into NEW button

export function useLoadQuotationFromBrowser(): void {
  useEffectOnce(() => {
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

    const quotation = jsonParseSafe<QuotationModelType>(quotationFromLocalStorage)
    if (quotation === undefined) {
      loadTemplate()
      return
    }

    // loadingDotsOverlayTextSignal.value = 'Loading local quotation from browser...'
    // setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 2000)

    quotationSignal.value = quotation
    dispatch(itemsSlice.actions.loadItemsReducer({ items }))
    // loadingDotsOverlayTextSignal.value = null
    setTimeout(() => { loadingDotsOverlayTextSignal.value = null }, 1000)
  })
}

function loadTemplate(): void {
  // loadingDotsOverlayTextSignal.value = 'Loading default template...'
  // setTimeout(() => {
  // loadingDotsOverlayTextSignal.value = null
  // }, 3000)

  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  localStorage.setItem(localStorageKey.items, JSON.stringify(defaultItems))
  localStorage.setItem(localStorageKey.quotation, JSON.stringify(quotationSignal.value))
}
