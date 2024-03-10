import { dispatch } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { customAlphabet } from 'nanoid'
import { defaultItems, isItemsFroalaSignal, itemsSlice, reRenderItemsSignal, saveItemsLocally } from '@entities/items'
import { quotationSignal, saveQuotationLocally } from '@entities/quotation'
import { markAsNotSaved } from '@shared/isSaved'

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

export const resetItems = (): void => {
  isItemsFroalaSignal.value = false
  dispatch(itemsSlice.actions.loadItemsReducer({ items: defaultItems }))
  saveItemsLocally({ items: defaultItems })
  quotationSignal.value = { id: 'local version' }
  saveQuotationLocally()
  markAsNotSaved()
  reRenderItemsSignal.value = nanoid(3)
  setTimeout(() => {
    isItemsFroalaSignal.value = true
  }, 1000 * theme.item.animationDuration)
}
