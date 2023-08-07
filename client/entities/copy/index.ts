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

export type { TPastePos, ICopyPlace } from './model/types'
export { exitCopyMode } from './model/exitCopyMode'