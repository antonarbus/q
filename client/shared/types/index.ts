import type { Action, ThunkAction } from '@reduxjs/toolkit'
import type { store } from '../clients'

export type {
  PasteItem,
  BoqCols,
  Item,
  Copyable,
  CopyableItem,
  BoqColWidth,
  BoqHeaderKey,
  BoqColumnKey,
  BoqRow,
  BoqRowCell,
  BoqItem,
} from './Item'

export type { PastePos, CopyPlace } from './Copy'

export type { OnItemResizeStop, OnItemResizeStart, OnItemResize } from './ResizablePaper'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
