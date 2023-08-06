export type { TItem } from './model/types'
export { defaultItems } from './model/defaultItems'
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

