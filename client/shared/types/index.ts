import type { Action, ThunkAction } from '@reduxjs/toolkit'
import type { store } from '../clients'

export type { PasteItem } from './Item'
export type { Item } from './Item'
export type { HtmlGetter } from './Item'

export type { PastePos } from './Copy'
export type { CopyPlace } from './Copy'
export type { CopyItem } from './Copy'

export type { OnFroalaContentChange } from './froala'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
