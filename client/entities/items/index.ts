export { defaultItems } from './model/defaultItems'
export { ItemWithActions } from './ui/ItemWithActions'
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

