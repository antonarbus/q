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
  exitFromCopyMode
} from './model/copySlice'

export type { PastePosType, CopyPlaceType, CopyItemType }  from './model/types'
