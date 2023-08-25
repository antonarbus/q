import type { Action, ThunkAction } from '@reduxjs/toolkit'
import type { store } from '../clients'

export type { PasteItem, BoqCols, Item, HtmlGetter, BoqColWidth, BoqHeaderKey } from './Item'

export type { PastePos, CopyPlace, CopyItem } from './Copy'

export type { OnFroalaContentChange } from './froala'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
