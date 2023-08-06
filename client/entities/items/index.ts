export { defaultItems } from './model/defaultItems'
export { ItemWithActionsSlot } from './ui/ItemWithActionsSlot'
export type { TItem } from './model/types'
export {
  itemsReducer,
  reOrderItems,
  deleteItem,
  pasteItem,
  resetItemsToDefault,
  tellItemSavedLocally,
  removeItemMsg,
  saveItemWidth,
  saveItemHeight,
  saveText,
  removePasteItem,
  insertPasteItem,
  selectIsLastItem,
} from './model/itemsSlice'

