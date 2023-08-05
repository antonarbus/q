export {
  copyReducer,
  showCopyContainer,
  hideCopyContainer,
  saveInitCordsOfCopyContainer,
  addItemIntoCopyContainer,
  removeItemFromCopyContainer,
  updatePastePos,
  showPasteText,
  hidePasteText,
  enterIntoCopyMode,
  exitFromCopyMode,
} from './model/copySlice'

export type { TPastePos as PastePosType, ICopyPlace as CopyPlaceType, TCopyItem as CopyItemType } from './model/types'
