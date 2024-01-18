import { type store } from '@libras/store'
import type { Action, ThunkAction } from '@reduxjs/toolkit'

// todo: move this type into items
export type {
  PasteItem,
  BoqCols,
  Item,
  Copyable,
  CopyableItem,
  BoqHeaderCell,
  BoqHeaderKey,
  BoqColumnKey,
  BoqRow,
  BoqRowCellPin,
  BoqRowCell,
  BoqItem,
} from './Item'

export type { PastePos, CopyPlace } from './Copy'

export type { OnItemResizeStop, OnItemResizeStart, OnItemResize } from './ResizablePaper'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
